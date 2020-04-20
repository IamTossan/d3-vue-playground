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
    <g ref="xAxis" :transform="`translate(0, ${svg.height - svg.padding})`" />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from 'vue-property-decorator';
import { scaleLinear, axisBottom, select } from 'd3';

type Bar = {
  x: number;
  y: number;
  height: number;
  width: number;
};

@Component
export default class Histogram extends Vue {
  @Prop() private histogramData!: Array<number>;

  @Ref('xAxis') xAxis!: SVGSVGElement;

  private svg = {
    height: 400,
    width: 600,
    padding: 20,
    color: '#4287f5',
  };

  get bars(): Array<Bar> {
    const XScale = scaleLinear()
      .domain([0, this.histogramData.length])
      .range([this.svg.padding, this.svg.width - this.svg.padding]);

    const YScale = scaleLinear()
      .domain([0, Math.max(...this.histogramData)])
      .range([this.svg.padding, this.svg.height - this.svg.padding * 2]);

    const barsData = this.histogramData.map((d, idx) => {
      const height = YScale(d);
      return {
        x: XScale(idx),
        y: this.svg.height - this.svg.padding - height,
        height,
        width:
          (this.svg.width - this.svg.padding) / this.histogramData.length - 1,
      };
    });

    return barsData;
  }

  mounted() {
    this.onHistogramDataChanged();
  }

  @Watch('histogramData')
  onHistogramDataChanged(): void {
    const XScale = scaleLinear()
      .domain([0, this.histogramData.length])
      .range([this.svg.padding, this.svg.width - this.svg.padding]);

    const xAxis = axisBottom(XScale);

    select(this.xAxis).call(xAxis);

    return;
  }
}
</script>

<style scoped>
svg {
  background-color: #eee;
}
</style>
