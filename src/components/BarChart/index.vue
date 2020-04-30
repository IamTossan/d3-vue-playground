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
export default class BarChart extends Vue {
  @Prop() private barChartData!: Array<number>;

  private svg = {
    height: 400,
    width: 600,
    padding: 10,
    color: '#4287f5',
  };

  get bars(): Array<Bar> {
    const XScale = scaleLinear()
      .domain([0, this.barChartData.length])
      .range([0, this.svg.width]);

    const YScale = scaleLinear()
      .domain([0, Math.max(...this.barChartData)])
      .range([0, this.svg.height]);

    const barsData = this.barChartData.map((d, idx) => {
      const height = YScale(d);
      return {
        x: XScale(idx),
        y: this.svg.height - height,
        height,
        width: this.svg.width / this.barChartData.length - 1,
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
