import React from 'react';

export interface Props {
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  windowWidth: number;
  windowHeight: number;
}

interface State {
  columns: number;
}

const BREAK_POINTS = [768, 1024];

class MasonryGrid extends React.Component<Props, State> {
  private masonryRef = React.createRef<HTMLDivElement>();

  public readonly state = {
    columns: 2
  };

  componentDidMount() {
    this.onResize();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.windowWidth !== this.props.windowWidth || prevProps.windowHeight !== this.props.windowHeight) {
      this.onResize();
    }
  }

  getColumns(width: number) {
    let columns =
      BREAK_POINTS.reduceRight((prev, curr, index) => {
        if (curr < width) {
          return prev;
        } else {
          return index;
        }
      }, BREAK_POINTS.length) + 2;

    if (columns > 4) {
      columns = 4;
    }

    return columns;
  }

  onResize = () => {
    if (this.masonryRef.current) {
      const masonryWidth = this.masonryRef.current.clientWidth;
      const columns = this.getColumns(masonryWidth);

      if (columns !== this.state.columns) {
        this.setState({ columns });
      }
    }
  };

  mapChildren() {
    const col = [];
    const nbColumns = this.state.columns;
    for (let i = 0; i < nbColumns; i++) {
      col.push([]);
    }
    return this.props.children.reduce((prev: number, curr: number, index: number) => {
      prev[index % nbColumns].push(curr);
      return prev;
    }, col);
  }

  render() {
    return (
      <div className="masonry" ref={this.masonryRef}>
        {/* TODO: Fix this the next time the file is edited. */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {this.mapChildren().map((col: any, index: number) => {
          return (
            <div className="column" key={index}>
              {/* TODO: Fix this the next time the file is edited. */}
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {col.map((child: any, id: number) => {
                return <div key={id}>{child}</div>;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default MasonryGrid;
