
import frida
import sys
import codecs
import webbrowser

def on_message(message, data):
    webbrowser.open(message['payload'],new=0)


def main(target_process):
    session = frida.attach(target_process)
    with codecs.open('lib/rev_msg_filehelper.js', 'r', 'utf-8') as f:
        source = f.read()
    script = session.create_script(source)
    script.on('message', on_message)
    script.load()
    print("[!] Ctrl+D on UNIX, Ctrl+Z on Windows/cmd.exe to detach from instrumented program.\n\n")
    sys.stdin.read()
    session.detach()


if __name__ == '__main__':
    main('wechat.exe')
