<template>
  <svg :height="svg.height" :width="svg.width">
    <rect
      v-for="(bar, idx) in bars"
      :key="idx"
      :x="bar.x"
      :y="bar.y"
      :height="bar.height"
      :width="bar.width"
      :fill="svg.color"
      rx="0.5%"
    ></rect>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { scaleLinear } from 'd3';

type Bar = {
  x: number;
  y: number;
  height: number;
  width: number;
};

@Component
export default class Histogram extends Vue {
  @Prop() private histogramData!: Array<number>;

  private svg = {
    height: 400,
    width: 600,
    padding: 10,
    color: '#4287f5',
  };

  get bars(): Array<Bar> {
    const XScale = scaleLinear()
      .domain([0, this.histogramData.length])
      .range([0, this.svg.width]);

    const YScale = scaleLinear()
      .domain([0, Math.max(...this.histogramData)])
      .range([0, this.svg.height]);

    const barsData = this.histogramData.map((d, idx) => {
      const height = YScale(d);
      return {
        x: XScale(idx),
        y: this.svg.height - height,
        height,
        width: this.svg.width / this.histogramData.length - 1,
      };
    });

    return barsData;
  }
}
</script>

<style scoped>
svg {
  background-color: #eee;
}
</style>
