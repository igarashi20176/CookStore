import { defineComponent, h, PropType } from 'vue'

import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    base: {
      type: String,
      default: ""
    },
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },
    plugins: {
      type: Array as PropType<Plugin<'pie'>[]>,
      default: () => []
    }
  },
  setup(props) {
    const chartData = {
      labels: Object.keys(props.data).map( (k: string) => `${k} ${ props.base ? `(${props.base})`: "" }` ),
      datasets: [
        {
          backgroundColor: ['#808080', '#ff6347', '#fdd35c'],
          data: Object.keys(props.data).map( (k: string) => props.data[k] )
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
      h(Pie, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
