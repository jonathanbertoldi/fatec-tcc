import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';

const styles = {
  footerContent: {
    float: 'right'
  },
  footerText: {
    float: 'right',
    paddingTop: '16px',
    height: '16px'
  }
};

class PaginationFooter extends Component {

  static propTypes = {
    offset: PropTypes.number.isRequired, // current offset
    total: PropTypes.number.isRequired, // total number of rows
    limit: PropTypes.number.isRequired, // num of rows in each page
    onPageClick: PropTypes.func.isRequired // what to do after clicking page number
  }

  render() {

    let { offset, total, limit } = this.props;

    return (
        <div style={styles.footerContent}>
          <IconButton disabled={offset === 0} onClick={this.props.onPageClick.bind(null, offset - limit)}>
            <ChevronLeft/>
          </IconButton>
          <IconButton disabled={offset + limit >= total} onClick={this.props.onPageClick.bind(null, offset + limit)}>
            <ChevronRight/>
          </IconButton>
          <div style={styles.footerText}>
            {Math.min((offset + 1), total) + '-' + Math.min((offset + limit), total) + ' of ' + total}
          </div>
        </div>
    );
  }

}

export default PaginationFooter;