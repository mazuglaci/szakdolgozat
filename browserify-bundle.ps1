$files = 
    "main.js",
    "navigation.js"
$src = "src/"
$output = "bundle/"
$common_name = "common.js"


Remove-Item ((Get-Location).Path + "/" + $output + "*.*")
# $cmd = "watchify main.js toml.js json.js -p [factor-bundle -o bundle/main.js -o bundle/toml.js -o bundle/json.js] -d -o bundle/common.js"
$cmd = "watchify "
foreach($file in $files) {
    $cmd = $cmd + $src + $file + " "
}
$cmd = $cmd + "-p [factor-bundle"
foreach($file in $files) {
    $cmd = $cmd + " -o " + $output + $file
}
$cmd = $cmd + "] -d -o " + $output + $common_name
Write-Output "Watchify files"
Write-Output $files
Write-Output ""
Write-Output Run: $cmd
Write-Output ""
Invoke-Expression $cmd

Write-Output ""
Write-Output 'Press any key to continue...';
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');