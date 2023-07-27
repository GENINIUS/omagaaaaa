gotye=""
pulsoesquerdox=0
pulsoesquerdoy=0
pulsodireitox=0
pulsodireitoy=0
scorepulsodireito=0
scorepulsoesquerdo=0
volume=0
function preload() {
    gotye=loadSound("Gotye.mp3")
}
function setup() {
    canvas=createCanvas(300,300)
    
    video=createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on("pose",gotPoses)

    
}
function draw() {
    background("white")
    image(video,0,0,300,300)
    canvas.center()
    if (scorepulsodireito>0.2) {
        circle(pulsodireitox,pulsodireitoy,20)
        if (pulsodireitoy>0&&pulsodireitoy<=0) {
            gotye.rate(0.5)
            document.getElementById("velocidade").innerHTML="velocidade:0.5x"
            
        }       
        else if (pulsodireitoy>100&&pulsodireitoy<=200){
            gotye.rate(1)
            document.getElementById("velocidade").innerHTML="velocidade:1x"
        } 
        else if (pulsodireitoy>200&&pulsodireitoy<=300){
            gotye.rate(1.5)
            document.getElementById("velocidade").innerHTML="velocidade:1.5x"
        }
        else if (pulsodireitoy>300&&pulsodireitoy<=400){
            gotye.rate(2)
            document.getElementById("velocidade").innerHTML="velocidade:2x"
        } 
        else{
            gotye.rate(2.5)
            document.getElementById("velocidade").innerHTML="velocidade:2.5x"
        } 
            
        
    }
    if (scorepulsoesquerdo>0.2) {
        circle(pulsoesquerdox,pulsoesquerdoy,20)
        volume=(floor(Number(pulsoesqurdoy)))/500
        gotye.setVolume(volume)
        document.getElementById("volumi").innerHTML="volume:"+volume
        
    }
}

function muzica() {
gotye.play()
    
}
function gotPoses(results) {
    if (results.length>0) {
        console.log("results")
        pulsoesquerdox=results[0].pose.leftWrist.x
        pulsoesquerdoy=results[0].pose.leftWrist.y
        console.log("pulsoesquerdo"+pulsoesquerdox+"pulsoesquerdoy")
        pulsodireitox=results[0].pose.rigthWrist.x
        pulsodireitoy=results[0].pose.rigthWrist.y
        console.log("pulsodireito"+pulsodireitox+"pulsodireitoy")
        scorepulsodireito=results[0].pose.keypoints[10].score
        scorepulsoesquerdo=results[0].pose.keypoints[9].score

    }
}
function modelLoaded() {
    console.log("modelLoaded")
}