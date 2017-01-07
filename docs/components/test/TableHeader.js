export default {
  name: 'TableHeader',
  props: {
    columns: Array,
    checkable: Boolean,
    showIndex: Boolean,
    state: {
      type: Object,
      default() {},
    },
  },

  computed: {
    cols() {
      return this.$parent.columns;
    },
  },

  // mounted() {
  //   console.log(this.$parent.columns);
  // },

  render(h) {// eslint-disable-line
    const state = this.state;
    return (
      <thead>
        <tr>
          {
            this.checkable ? <th><input type="checkbox" /></th> : ''
          }
          {
            this.showIndex ? <th>#</th> : ''
          }
          {
            this._l(this.cols, (column, cellIndex) => {
              if (!column.visible) return null;
              const classes = 'sortable';
              let sorterEl = '';
              let sortClass = 'sort';
              if (column.sorter) {
                if (state.sortKey === column.field && state.reverse) {
                  sortClass = 'sort-desc';
                } else if (state.sortKey === column.field && !state.reverse) {
                  sortClass = 'sort-asc';
                }
                sorterEl = <span class={`sort-trigger ${sortClass}`}><i class={`fa fa-${sortClass}`}></i></span>;
              }
              return (
                <th key={cellIndex}
                    class={classes}
                    onClick={this.$parent.handleToggleSort.bind(this, column)}>
                  <span>{column.label}</span>
                  {sorterEl}
                </th>
              );
            })
          }
        </tr>
      </thead>
    );
  },
};
