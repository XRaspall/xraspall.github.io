<template>
  <div class="roulette-container">
    <div class="container">
      <h1>🎯 Ruleta de Tareas</h1>
      <p class="subtitle">¿Quién será el afortunado?</p>

      <div class="roulette-wrapper">
        <div class="pointer"></div>
        <div class="roulette" ref="rouletteRef" :style="{ transform: `rotate(${rotation}deg)` }">
          <svg viewBox="0 0 400 400" class="roulette-svg">
            <circle cx="200" cy="200" r="200" fill="white" stroke="white" stroke-width="10"/>

            <g v-for="(name, index) in names" :key="`slice-${index}`">
              <path
                :d="getSlicePath(index)"
                :fill="colors[name]"
                class="slice-sector"
              />
              <!-- Mostrar imagen si existe -->
              <image
                v-if="hasImage[name]"
                :href="`/${name.toLowerCase()}.png`"
                :x="getLabelX(index) - 25"
                :y="getLabelY(index) - 25"
                width="50"
                height="50"
                class="slice-image"
              />
              <!-- Mostrar texto si no tiene imagen -->
              <text
                v-else
                :x="getLabelX(index)"
                :y="getLabelY(index)"
                class="slice-label"
              >
                {{ name }}
              </text>
            </g>

            <circle cx="200" cy="200" r="30" fill="white" stroke="#ddd" stroke-width="2"/>
          </svg>
        </div>
      </div>

      <button class="spin-button" @click="spin" :disabled="isSpinning">
        {{ isSpinning ? 'Girando...' : 'Girar Ruleta' }}
      </button>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  name: 'Roulette',
  data() {
    return {
      names: ['Xavi', 'Abdel', 'Marc', 'Romina', 'David', 'Eric'],
      colors: {
        'Xavi': '#FF6B6B',
        'Abdel': '#4ECDC4',
        'Marc': '#45B7D1',
        'Romina': '#FFA07A',
        'David': '#FFB6B9',
        'Eric': '#98D8C8'
      },
      hasImage: {
        'Xavi': true,
        'Abdel': true,
        'Marc': true,
        'Romina': true,
        'David': false,
        'Eric': false
      },
      rotation: 0,
      isSpinning: false,
      currentRotation: 0
    };
  },
  methods: {
    getSlicePath(index) {
      const numSlices = this.names.length;
      const anglePerSlice = 360 / numSlices;
      const halfSlice = anglePerSlice / 2;
      // Offset de 90 + halfSlice para que el centro del slice 0 esté en top
      const offset = -90 - halfSlice;
      const startAngle = (index * anglePerSlice + offset) * (Math.PI / 180);
      const endAngle = ((index + 1) * anglePerSlice + offset) * (Math.PI / 180);

      const x1 = 200 + 200 * Math.cos(startAngle);
      const y1 = 200 + 200 * Math.sin(startAngle);
      const x2 = 200 + 200 * Math.cos(endAngle);
      const y2 = 200 + 200 * Math.sin(endAngle);

      const largeArc = anglePerSlice > 180 ? 1 : 0;

      return `M 200 200 L ${x1} ${y1} A 200 200 0 ${largeArc} 1 ${x2} ${y2} Z`;
    },
    getLabelX(index) {
      const numSlices = this.names.length;
      const anglePerSlice = 360 / numSlices;
      const halfSlice = anglePerSlice / 2;
      const offset = -90 - halfSlice;
      const midAngle = (index * anglePerSlice + anglePerSlice / 2 + offset) * (Math.PI / 180);
      return 200 + 130 * Math.cos(midAngle);
    },
    getLabelY(index) {
      const numSlices = this.names.length;
      const anglePerSlice = 360 / numSlices;
      const halfSlice = anglePerSlice / 2;
      const offset = -90 - halfSlice;
      const midAngle = (index * anglePerSlice + anglePerSlice / 2 + offset) * (Math.PI / 180);
      return 200 + 130 * Math.sin(midAngle);
    },
    spin() {
      if (this.isSpinning) return;

      this.isSpinning = true;

      const degreesPerSlice = 360 / this.names.length;

      // Generar una rotación completamente aleatoria (varias vueltas + un ángulo aleatorio)
      // Vueltas extra: 5-8 rotaciones completas
      const extraRotations = (Math.floor(Math.random() * 4) + 5) * 360;

      // Ángulo aleatorio adicional dentro de 0-360 grados para más variación
      const randomAngle = Math.random() * 360;

      // Normalizar currentRotation a 0-360
      const normalizedRotation = ((this.currentRotation % 360) + 360) % 360;

      // Calcular la rotación final (rotación actual + vueltas extra + ángulo aleatorio)
      const finalRotation = this.currentRotation + extraRotations + randomAngle;

      // Animate with GSAP
      gsap.to(this, {
        rotation: finalRotation,
        duration: 4,
        ease: "power4.out",
        onUpdate: () => {
          this.$refs.rouletteRef.style.transform = `rotate(${this.rotation}deg)`;
        },
        onComplete: () => {
          this.currentRotation = finalRotation;
          this.isSpinning = false;
        }
      });

      // Button bounce effect
      gsap.to(document.querySelector('.spin-button'), {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    },
    initAnimation() {
      gsap.from('.container', {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "back.out"
      });

      gsap.from('.roulette-wrapper', {
        opacity: 0,
        rotation: -180,
        duration: 1,
        delay: 0.3,
        ease: "back.out"
      });
    }
  },
  mounted() {
    this.initAnimation();
  }
};
</script>

<style scoped>
.roulette-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.container {
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
}

h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 2.5em;
}

.subtitle {
  color: #666;
  margin-bottom: 40px;
  font-size: 1.1em;
}

.roulette-wrapper {
  position: relative;
  width: 450px;
  height: 450px;
  margin: 0 auto 40px;
}

.pointer {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid #ff4444;
  z-index: 10;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.3));
}

.roulette {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0s linear;
}

.roulette-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.roulette-svg .slice-sector {
  transition: none;
}

.roulette-svg .slice-label {
  font-size: 24px;
  font-weight: bold;
  fill: white;
  text-anchor: middle;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4));
}

.roulette-svg .slice-image {
  border-radius: 50%;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.4));
}

.spin-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 20px 50px;
  font-size: 1.3em;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.spin-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.spin-button:active:not(:disabled) {
  transform: translateY(-1px);
}

.spin-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


@media (max-width: 600px) {
  .roulette-wrapper {
    width: 300px;
    height: 300px;
  }

  h1 {
    font-size: 2em;
  }

  .spin-button {
    padding: 15px 40px;
    font-size: 1.1em;
  }

  .pointer {
    top: -12px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 24px solid #ff4444;
  }
}
</style>
