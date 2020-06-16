function line(particle1, particle2, distance){
  context.lineWidth = (threshold*2 - distance*1.5)/50
  let color = 200 - Math.floor(distance)
  context.strokeStyle = `rgb(${color}, ${color}, ${color})`

  context.beginPath()
  context.moveTo(particle1.x, particle1.y)
  context.lineTo(particle2.x, particle2.y)
  context.stroke()
  
}

function animate(){
  context.clearRect(0, 0, canvas.width, canvas.height)
  for (let i=0; i< particles.length; i++){
    let particle1 = particles[i]
    context.fillRect( particle1.x - particleSize/2, 
                      particle1.y - particleSize/2, 
                      particleSize/2, particleSize/2)
    for (let j=0; j< particles.length; j++){
      if (i==j){continue}
      let particle2 = particles[j]
      let distance = Math.abs(particle1.x - particle2.x) + Math.abs(particle1.y-particle2.y)
      if (distance < threshold){
        line(particle1, particle2, distance)
      }
    }
    particle1.x += particle1.vx
    particle1.y += particle1.vy
    if (particle1.x > canvas.width || particle1.x < particleSize)
      particle1.vx = -particle1.vx
      if (particle1.y > canvas.height || particle1.y < particleSize)
      particle1.vy = -particle1.vy
  }
  window.requestAnimationFrame(animate) 
}

function createParticles(maxNum){
  for (let i=0; i<maxNum; i++){
    let particle = {
      x : Math.random()*canvas.width,
      y : Math.random()*canvas.height,
      vx : (Math.random()*2-1)*0.7,
      vy : (Math.random()*2-1)*0.7
    }
    particles.push(particle)
  }
}

function handleUpdate(){
  console.log (this.value)
  console.log (this.name)
  if (this.name == "maxNum"){ changeParticles(this.value-maxParticles)}
  else if (this.name == "thres"){ threshold = this.value}
  else if (this.name == "size"){ particleSize = this.value}
}

function changeParticles(difference){
  if ((difference) < 0) {
    particles.splice(difference, -difference)
  }
  else {
    createParticles(difference)
  }
  maxParticles += difference
}

let maxParticles = 70
let particleSize = 4
let threshold = 70
let particles = []
let canvas = document.querySelector("#bg")
let context = canvas.getContext('2d')


let Ctrls = document.querySelectorAll("#controls input")
Ctrls.forEach(ctrl => {
  ctrl.addEventListener("change", handleUpdate)
  ctrl.addEventListener("mousemove", handleUpdate)
}) 

createParticles(maxParticles)
context.fillStyle = 'white'
animate()