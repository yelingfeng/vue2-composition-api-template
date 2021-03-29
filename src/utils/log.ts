/*
 * @Author: fuping
 * @Date: 2020-06-26 13:30:41
 * @LastEditors: fuping
 * @LastEditTime: 2020-07-21 16:21:42
 * @Description:
 */

/**
 * @introduction  获取用户内网ip
 * @param {any}
 * @return {返回类型说明}
 * @exception [用例类型] [违例类型说明]getUserIP((ip: any) => {})
 */
declare var window: Window & { RTCPeerConnection: any; mozRTCPeerConnection: any; webkitRTCPeerConnection: any }
export const getUserIP = (onNewIP: any) => {
  const MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
  const pc = new MyPeerConnection({
    iceServers: []
  })
  const noop = () => {}
  const localIPs = {}
  const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g
  const iterateIP = (ip: any) => {
    if (!localIPs[ip]) onNewIP(ip)
    localIPs[ip] = true
  }
  pc.createDataChannel('')
  pc.createOffer()
    .then((sdp: any) => {
      sdp.sdp.split('\n').forEach(function(line: any) {
        if (line.indexOf('candidate') < 0) return
        line.match(ipRegex).forEach(iterateIP)
      })
      pc.setLocalDescription(sdp, noop, noop)
    })
    .catch(reason => {})
  pc.onicecandidate = ice => {
    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP)
  }
}

export const getIP = () => {
  const RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection
  let ip = ''
  if (RTCPeerConnection)
    (function() {
      const rtc = new RTCPeerConnection({ iceServers: [] })
      if (1 || window.mozRTCPeerConnection) {
        rtc.createDataChannel('', { reliable: false })
      }
      rtc.onicecandidate = function(evt) {
        if (evt.candidate) grepSDP('a=' + evt.candidate.candidate)
      }
      rtc.createOffer(
        function(offerDesc) {
          grepSDP(offerDesc.sdp)
          rtc.setLocalDescription(offerDesc)
        },
        function(e) {
          console.warn('offer failed', e)
        }
      )
      const addrs = Object.create(null)
      addrs['0.0.0.0'] = false
      function updateDisplay(newAddr) {
        if (newAddr in addrs) return
        else addrs[newAddr] = true
        const displayAddrs = Object.keys(addrs).filter(function(k) {
          return addrs[k]
        })
        for (let i = 0; i < displayAddrs.length; i++) {
          if (displayAddrs[i].length > 16) {
            displayAddrs.splice(i, 1)
            i--
          }
        }
        //打印出该设备连接的所有内网ip
        console.log(displayAddrs)
        //排第一个ip
        console.log(displayAddrs[0])
        ip = displayAddrs[0]
      }
      function grepSDP(sdp) {
        console.log(sdp)
        let hosts = []
        sdp.split('\r\n').forEach(function(line, index, arr) {
          if (~line.indexOf('a=candidate')) {
            let parts = line.split(' '),
              addr = parts[4],
              type = parts[7]
            if (type === 'host') updateDisplay(addr)
          } else if (~line.indexOf('c=')) {
            let parts = line.split(' '),
              addr = parts[2]
            updateDisplay(addr)
          }
        })
      }
    })()
  else {
    console.log('请使用主流浏览器：chrome')
  }
  return ip
}
