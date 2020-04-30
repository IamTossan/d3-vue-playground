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
export default class BarChart extends Vue {
  @Prop() private barChartData!: Array<number>;

  @Ref('xAxis') xAxis!: SVGSVGElement;

  private svg = {
    height: 400,
    width: 600,
    padding: 20,
    color: '#4287f5',
  };

  get bars(): Array<Bar> {
    const XScale = scaleLinear()
      .domain([0, this.barChartData.length])
      .range([this.svg.padding, this.svg.width - this.svg.padding]);

    const YScale = scaleLinear()
      .domain([0, Math.max(...this.barChartData)])
      .range([this.svg.padding, this.svg.height - this.svg.padding * 2]);

    const barsData = this.barChartData.map((d, idx) => {
      const height = YScale(d);
      return {
        x: XScale(idx),
        y: this.svg.height - this.svg.padding - height,
        height,

        width:
          (this.svg.width - this.svg.padding) / this.barChartData.length - 1,
      };
    });

    return barsData;
  }

  mounted() {
    this.onBarChartDataChanged();
  }

  @Watch('barChartData')
  onBarChartDataChanged(): void {
    const XScale = scaleLinear()
      .domain([0, this.barChartData.length])
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
