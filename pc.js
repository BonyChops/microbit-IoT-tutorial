// Remote Example1 - controller

var channel;
onload = async function () {
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket");
	channel = await relay.subscribe("chirimenLED");
	messageDiv.innerText = "achex web socketリレーサービスに接続しました";
	channel.onmessage = getMessage;
	turnOnOff();
}

function getMessage(msg) { // メッセージを受信したときに起動する関数
	messageDiv.innerText = msg.data;
}

function OnLED() { // LED ON
	console.log("on")
	channel.send("LED ON");
}

function OffLED() { // LED OFF
	console.log("off")
	channel.send("LED OFF");
}

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

const turnOnOff = async() => {
	for (;;) {
		OnLED();
		await sleep(1000);
		OffLED();
		await sleep(1000);
	}
}