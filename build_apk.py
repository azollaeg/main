import os
import sys
import shutil
import subprocess
import zipfile

# Ensure UTF-8 output on Windows terminal
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

def run_cmd(cmd, desc=""):
    print(f"[*] {desc}...")
    try:
        print(f"    CMD: {cmd}")
    except Exception:
        pass
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, shell=True)
    if res.returncode != 0:
        print(f"[!] ERROR in {desc} (Exit code: {res.returncode})")
        print(f"    STDOUT:\n{res.stdout}")
        print(f"    STDERR:\n{res.stderr}")
        raise RuntimeError(f"Command failed: {desc}")
    if res.stdout.strip():
        first_line = res.stdout.strip().splitlines()[0]
        print(f"    OUTPUT: {first_line[:120]}...")
    return res.stdout

def main():
    project_dir = os.path.abspath(r"d:\فلاشة\azolla website")
    mobile_dir = os.path.join(project_dir, "mobile_app")
    
    # Use ASCII temp directory to ensure full compatibility with Android SDK C++ tools (aapt, zipalign)
    temp_root = os.environ.get("TEMP", r"C:\Temp")
    build_dir = os.path.join(temp_root, "azolla_android_build")
    
    print(f"[*] Preparing build staging in pure ASCII directory: {build_dir}")
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir)
    os.makedirs(build_dir, exist_ok=True)
    
    # Toolchain paths
    jdk_bin = r"C:\Program Files\Microsoft\jdk-17.0.20.101-hotspot\bin"
    sdk_tools = r"C:\Android\Sdk\build-tools\34.0.0"
    android_jar = r"C:\Android\Sdk\platforms\android-34\android.jar"
    
    aapt = os.path.join(sdk_tools, "aapt.exe")
    d8 = os.path.join(sdk_tools, "d8.bat")
    zipalign = os.path.join(sdk_tools, "zipalign.exe")
    apksigner = os.path.join(sdk_tools, "apksigner.bat")
    javac = os.path.join(jdk_bin, "javac.exe")
    keytool = os.path.join(jdk_bin, "keytool.exe")
    
    # Staging paths
    stage_src = os.path.join(build_dir, "src")
    stage_res = os.path.join(stage_src, "res")
    stage_assets = os.path.join(stage_src, "assets")
    stage_java = os.path.join(stage_src, "java")
    
    # Original source paths
    orig_app_main = os.path.join(mobile_dir, "android", "app", "src", "main")
    
    # Copy source tree to staging
    shutil.copytree(os.path.join(orig_app_main, "res"), stage_res)
    shutil.copytree(os.path.join(orig_app_main, "assets"), stage_assets)
    shutil.copytree(os.path.join(orig_app_main, "java"), stage_java)
    
    manifest_xml = os.path.join(stage_src, "AndroidManifest.xml")
    shutil.copyfile(os.path.join(orig_app_main, "AndroidManifest.xml"), manifest_xml)
    
    gen_dir = os.path.join(build_dir, "gen")
    bin_classes = os.path.join(build_dir, "classes")
    dex_dir = os.path.join(build_dir, "dex")
    os.makedirs(gen_dir, exist_ok=True)
    os.makedirs(bin_classes, exist_ok=True)
    os.makedirs(dex_dir, exist_ok=True)
    
    # 1. Generate R.java
    cmd_r = f'"{aapt}" package -f -m -J "{gen_dir}" -M "{manifest_xml}" -S "{stage_res}" -I "{android_jar}"'
    run_cmd(cmd_r, "Generating R.java")
    
    # Gather Java sources
    java_files = []
    for root, dirs, files in os.walk(stage_java):
        for file in files:
            if file.endswith('.java'):
                java_files.append(f'"{os.path.join(root, file)}"')
                
    for root, dirs, files in os.walk(gen_dir):
        for file in files:
            if file.endswith('.java'):
                java_files.append(f'"{os.path.join(root, file)}"')
                
    # 2. Compile Java with javac
    cmd_javac = f'"{javac}" -encoding UTF-8 -d "{bin_classes}" -cp "{android_jar}" -source 8 -target 8 {" ".join(java_files)}'
    run_cmd(cmd_javac, "Compiling Java with javac (Java 8 bytecode for Android)")
    
    # Gather compiled classes
    class_files = []
    for root, dirs, files in os.walk(bin_classes):
        for file in files:
            if file.endswith('.class'):
                class_files.append(f'"{os.path.join(root, file)}"')
                
    # 3. D8 DEX compilation
    cmd_d8 = f'"{d8}" --output "{dex_dir}" --lib "{android_jar}" --min-api 21 {" ".join(class_files)}'
    run_cmd(cmd_d8, "Compiling bytecode to classes.dex with D8")
    
    classes_dex = os.path.join(dex_dir, "classes.dex")
    if not os.path.exists(classes_dex):
        raise FileNotFoundError("classes.dex was not generated!")
    print(f"[*] Generated classes.dex successfully (size: {os.path.getsize(classes_dex)} bytes)")
    
    # 4. Package initial APK with aapt
    unaligned_apk = os.path.join(build_dir, "unaligned.apk")
    cmd_pkg = f'"{aapt}" package -f -M "{manifest_xml}" -S "{stage_res}" -A "{stage_assets}" -I "{android_jar}" -F "{unaligned_apk}"'
    run_cmd(cmd_pkg, "Packaging resources and assets with AAPT")
    
    # 5. Add classes.dex into unaligned.apk
    print("[*] Adding classes.dex into APK...")
    with zipfile.ZipFile(unaligned_apk, 'a', compression=zipfile.ZIP_DEFLATED) as z:
        z.write(classes_dex, "classes.dex")
    print(f"[*] Unaligned APK created (size: {os.path.getsize(unaligned_apk)} bytes)")
    
    # 6. Align APK with zipalign
    aligned_apk = os.path.join(build_dir, "aligned.apk")
    cmd_align = f'"{zipalign}" -f -p 4 "{unaligned_apk}" "{aligned_apk}"'
    run_cmd(cmd_align, "Aligning APK with zipalign (4-byte page boundary)")
    
    # 7. Keystore creation if needed
    keystore_file = os.path.join(build_dir, "azolla_release.jks")
    print("[*] Generating official release keystore...")
    cmd_key = (f'"{keytool}" -genkeypair -v -keystore "{keystore_file}" -storepass azolla2026 '
               f'-alias azolla -keypass azolla2026 -keyalg RSA -keysize 2048 -validity 10000 '
               f'-dname "CN=Azolla Egypt, OU=Protic, O=Integrated Services Association, L=Kafr El Dawwar, ST=Beheira, C=EG"')
    run_cmd(cmd_key, "Generating release keystore")
    
    # 8. Sign APK with apksigner (v1 + v2 + v3)
    final_apk = os.path.join(build_dir, "azolla_egypt_signed.apk")
    cmd_sign = (f'"{apksigner}" sign --ks "{keystore_file}" --ks-key-alias azolla '
                f'--ks-pass pass:azolla2026 --key-pass pass:azolla2026 '
                f'--v1-signing-enabled true --v2-signing-enabled true --v3-signing-enabled true '
                f'--out "{final_apk}" "{aligned_apk}"')
    run_cmd(cmd_sign, "Signing APK with apksigner (v1, v2, v3 schemes)")
    
    # 9. Verify signature
    cmd_verify = f'"{apksigner}" verify --verbose "{final_apk}"'
    verify_out = run_cmd(cmd_verify, "Verifying signed APK")
    print("[*] Verification result:\n" + verify_out)
    
    # 10. Check aapt badging
    cmd_badge = f'"{aapt}" dump badging "{final_apk}"'
    badge_out = run_cmd(cmd_badge, "Checking package metadata with aapt dump badging")
    lines = [l for l in badge_out.splitlines() if any(k in l for k in ['package:', 'application-label:', 'sdkVersion:', 'targetSdkVersion:'])]
    print("[*] Package Details:\n" + "\n".join(lines))
    
    # 11. Copy to target destinations
    target_root_apk = os.path.join(project_dir, "azolla_egypt.apk")
    target_mobile_apk = os.path.join(mobile_dir, "azolla_egypt.apk")
    
    shutil.copyfile(final_apk, target_root_apk)
    shutil.copyfile(final_apk, target_mobile_apk)
    
    file_size_mb = os.path.getsize(target_root_apk) / (1024 * 1024)
    print(f"\n=======================================================")
    print(f"SUCCESS! Authentic Compiled Android APK is Ready!")
    print(f"File: {target_root_apk}")
    print(f"Size: {file_size_mb:.2f} MB ({os.path.getsize(target_root_apk)} bytes)")
    print(f"=======================================================\n")

if __name__ == '__main__':
    main()
