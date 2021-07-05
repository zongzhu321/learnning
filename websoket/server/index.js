const ws = require('ws')

;((ws) => {
    const server = new ws.Server({
        port: 8000
    });

    const init = () => {
        bindEvent();
    }

    function bindEvent(){
        server.on('open', handleOpen);
        server.on('close', handleClose);
        server.on('error', handleError);
        server.on('connect', handleConnect)
    }

    init();

    function handleOpen(e){
        console.log('open',e)
    }
    function handleClose(e){
        console.log('close',e)
    }
    function handleError(e){
        console.log('error',e)
    }
    function handleConnect(ws){
        console.log('connect',ws);
        ws.on('message', handleMessage)
    }

    function handleMessage(msg){
        console.log(msg)
    }


})(ws)