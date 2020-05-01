<template>
  <svg :height="svg.height" :width="svg.width">
    <circle
      v-for="(dot, index) in dots"
      :key="index"
      :cx="dot.cx"
      :cy="dot.cy"
      :r="dot.r"
      @click="handleClickDot(dot)"
    />
    <g ref="xAxis" :transform="`translate(0, ${svg.height - svg.padding})`" />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from 'vue-property-decorator';
import { scaleLinear, axisBottom, select } from 'd3';

interface Dot {
  x: number;
  y: number;
  description: string;
}

interface Circle {
  cx: number;
  cy: number;
  r: number;
  description: string;
}

@Component
export default class ConnectedDots extends Vue {
  @Prop() private chartData!: Array<Dot>;

  @Ref('xAxis') xAxis!: SVGSVGElement;

  private svg = {
    height: 400,
    width: 600,
    padding: 20,
    color: '#4287f5',
  };

  get dots(): Array<Circle> {
    const XScale = scaleLinear()
      .domain([0, Math.max(...this.chartData.map(d => d.x))])
      .range([this.svg.padding, this.svg.width - this.svg.padding]);

    const YScale = scaleLinear()
      .domain([0, Math.max(...this.chartData.map(d => d.y))])
      .range([this.svg.padding, this.svg.height - this.svg.padding * 2]);

    const dotsData = this.chartData.map((d: Dot) => {
      const height = YScale(d.y);
      return {
        cx: XScale(d.x),
        cy: this.svg.height - this.svg.padding - height,
        r: 5,
        description: d.description,
      };
    });

    return dotsData;
  }

  mounted() {
    this.onBarChartDataChanged();
  }

  @Watch('chartData')
  onBarChartDataChanged(): void {
    const XScale = scaleLinear()
      .domain([0, Math.max(...this.chartData.map(d => d.x))])
      .range([this.svg.padding, this.svg.width - this.svg.padding]);

    const xAxis = axisBottom(XScale);

    select(this.xAxis).call(xAxis);

    return;
  }

  public handleClickDot(dot: Circle) {
    console.log(dot);
  }
}
</script>

<style scoped>
svg {
  background-color: #eee;
}
</style>
