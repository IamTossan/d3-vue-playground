<template>
  <svg :height="svg.height" :width="svg.width">
    <path
      :stroke="svg.colors.secondary"
      fill="none"
      stroke-width="5"
      :d="edges"
    />
    <circle
      v-for="(node, index) in nodes"
      :key="index"
      :cx="node.cx"
      :cy="node.cy"
      :r="node.r"
      :fill="svg.colors.primary"
      @click="handleClickNode(node)"
    />
    <g ref="xAxis" :transform="`translate(0, ${svg.height - svg.padding})`" />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from 'vue-property-decorator';
import { scaleLinear, axisBottom, select, line, curveMonotoneX } from 'd3';
import colors from '../../theme';

interface Dot {
  x: number;
  y: number;
  description: string;
}

interface Node {
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
    colors,
  };

  get xScale() {
    return scaleLinear()
      .domain([0, Math.max(...this.chartData.map(d => d.x))])
      .range([this.svg.padding, this.svg.width - this.svg.padding]);
  }

  get yScale() {
    return scaleLinear()
      .domain([0, Math.max(...this.chartData.map(d => d.y))])
      .range([this.svg.padding, this.svg.height - this.svg.padding * 2]);
  }

  get nodes(): Array<Node> {
    const dotsData = this.chartData.map((d: Dot) => {
      const height = this.yScale(d.y);
      return {
        cx: this.xScale(d.x),
        cy: this.svg.height - this.svg.padding - height,
        r: 5,
        description: d.description,
      };
    });

    return dotsData;
  }

  get edges(): string | null {
    const lineGenerator = line()
      .curve(curveMonotoneX)
      .x(v => v[0])
      .y(v => v[1]);

    return lineGenerator(
      this.chartData.map(v => [
        this.xScale(v.x),
        this.svg.height - this.svg.padding - this.yScale(v.y),
      ]),
    );
  }

  mounted() {
    this.onBarChartDataChanged();
  }

  @Watch('chartData')
  onBarChartDataChanged(): void {
    const xAxis = axisBottom(this.xScale);

    const axisElement = select(this.xAxis).call(xAxis);

    axisElement
      .selectAll('path, line')
      .attr('stroke', this.svg.colors.darkPrimary);
    axisElement.selectAll('text').attr('fill', this.svg.colors.darkPrimary);

    return;
  }

  public handleClickNode(dot: Node) {
    console.log(dot);
  }
}
</script>

<style scoped lang="scss">
svg {
  path,
  circle {
    transition: all 500ms ease;
  }
}
</style>
