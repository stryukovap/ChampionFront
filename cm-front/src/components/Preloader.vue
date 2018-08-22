<template>
	<div id="preloader" class="progress-circle__container">
		<span class="progress-circle__percent">{{ percentage }}%</span>

		<svg class="progress-circle" viewBox="0 0 106 106" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<g id="ProgressBar" transform="translate(-17.000000, -17.000000)">
					<circle id="Oval" stroke="#949494" stroke-width="5" fill-rule="nonzero" cx="70" cy="70"
					        r="50"></circle>
					<path class="progress-circle__path"
					      d="M70,120 C97.6142375,120 120,97.6142375 120,70 C120,42.3857625 97.6142375,20 70,20 C42.3857625,20 20,42.3857625 20,70 C20,97.6142375 42.3857625,120 70,120 Z"
					      id="Oval-Copy" stroke="#000000" stroke-width="5" :stroke-dasharray="circle"
					      fill-rule="nonzero"
					      transform="translate(70.000000, 70.000000) rotate(-125.000000) translate(-70.000000, -70.000000) "></path>
				</g>
			</g>
		</svg>

	</div>
</template>

<script>
export default {
  name: "Preloader",
  data() {
    return {
      percentage: 0,
      images: this.imagesArray(),
      loadedImages: 0
    };
  },
  methods: {
    imagesArray() {
      return document.images;
    },
    imageLoaded() {
      const pagePreload = document.getElementById("preloader");
      this.loadedImages++;
      this.percentage = ((100 / this.images.length) * this.loadedImages) << 0;
      if (this.loadedImages >= this.images.length) {
        //set hard delay with setTimeout
        // setTimeout(() => {
        if (!pagePreload.classList.contains("done")) {
          pagePreload.classList.add("done");
        }
        // }, 700);
      }
    }
  },
  computed: {
    circle() {
      return (this.percentage / 100) * 100 * Math.PI + ",9999";
    }
  },
  mounted() {
    for (let i = 0; i < this.images.length; i++) {
      let imageClone = new Image();
      imageClone.addEventListener("load", this.imageLoaded, true);
      imageClone.addEventListener("error", this.imageLoaded, true);
      imageClone.src = this.images[i].src;
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-circle {
  max-width: 200px;
  max-height: 200px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scaleX(-1) rotate(-55deg);
  z-index: 999;

  &__percent {
    font-size: 50px;
    text-shadow: -1px -1px #fff, -2px -2px #fff, -1px 1px #fff, -2px 2px #fff,
      1px 1px #fff, 2px 2px #fff, 1px -1px #fff, 2px -2px #fff,
      -3px -3px 2px #bbb, -3px 3px 2px #bbb, 3px 3px 2px #bbb, 3px -3px 2px #bbb;
    color: #b83721;
    transition: all 1s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }

  &__container {
    display: inline-block;
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 998;
    background: rgb(167, 197, 120);
    opacity: 1;
    visibility: visible;
    transition: all 0.5s;
  }

  &__path {
    transition: 0.5s ease-in-out all;
  }
}

.preloader {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: #2acd7d;
  opacity: 1;
  visibility: visible;
  transition: all 0.5s;
  z-index: 999;
}

.done {
  opacity: 0;
  visibility: hidden;
}
</style>
