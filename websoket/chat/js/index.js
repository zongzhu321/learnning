((doc, Socket) => {

    const oList = doc.querySelector('#list')
    const oMsg = doc.querySelector('#message');
    const oSendBtn = doc.querySelector('#send');

    const ws = new WebSocket("ws://localhost:8000");   //new WebSocket("ws://localhost:8000/ws")

    const init = () => {
        bindEvent()
    }
    init()

    function bindEvent(){
        oSendBtn.addEventListener('click', handleSendBtnClick, false);
        ws.addEventListener('open', handleOpen, false);
        ws.addEventListener('close', handleClose, false);
        ws.addEventListener('error', handleError, false);
        ws.addEventListener('message', handleMessage, false)
    }

    function handleSendBtnClick(){
        console.log('send mesage')
    }

    function handleOpen(e){
        console.log('websocket open11', e)
    }

    function handleClose(e){
        console.log('websocket close11', e)
    }

    function handleError(e){
        console.log('websocket error11', e)
    }

    function handleMessage(e){
        console.log('websocket message11',e)
    }


})(document, WebSocket)

// 放大模式