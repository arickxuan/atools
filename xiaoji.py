#encoding=utf-8

import mitmproxy.http

from mitmproxy import ctx

import logging

import json

from urllib import parse
from urllib.parse import urlparse
from urllib.parse import parse_qs

def response (flow) -> None:
# 修改这两个响应，尝试绕过激活
    for m in ['check.html', 'active.html' ]:
        if m in flow.request.pretty_url:
            print (flow.request.pretty_url)
            data = json.loads(flow.response.content)
            data['code'] = 0
            data['msg'] = '激活成功！！'
            data['status'] = 200
            flow.response.content = json.dumps (data).encode()
            return

def request(flow):
# 修改这个请求，尝试绕过激活
    if b'action=downfile' in flow.request.content:
        game_id = parse.parse_qs(flow.request.content.decode())['gameid'][0]
        print('游戏id',game_id)
        str = f'gameid={game_id}&uid=231427176&ticket=AGIDMVM5Aj1WYVw%2FVGUPPlJgAQFVMAVmUjcHYlNjBjcEZ1NrUjwLYgRgATFSMQJhUmdUbVFgVmVRN1dlUzYCZgBmA2BTPwI8VmpcaVQxDzlSMwFsVQgFNFI1BzRTNgYxBGxTa1I8CzkENw%3D%3D&action=downfile&model=user&clientparams=1.8.7%7C12%7Czh%7CIN2010%7C1080*2245%7C2.0%7CA128%7COnePlus%7COnePlus%7C02%3A00%3A00%3A00%3A00%3A00%7Cdb61c66777bd0d90%7C&'
        flow.request.content = str.encode()

