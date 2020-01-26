import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { hideArcs, hideOborot, hidePostav, hideZakaz } from '../../redux/actions';

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  updateViewport = viewport => {
  	this.props.mapboxViewportChange(viewport);
    this.setState({viewport});
  };

  render() {
    console.log(this.props.layers);
    return (
      <div class="sidebar-wrap">
        <div class="sidebar">
          <div class="title">
            Оферты за период
            <div class="subtitle">
              14 янв. - 26 янв.
            </div>
          </div>
          <div class="postavshiki">
            <span>1196</span> поставщиков
          </div>
          <div class="money">
            <span>193 634 820</span> ₽
            <div class="subtitle">
              Суммарный объем оферт
            </div>
            <div>
            <div class="button" onClick={() => {
              const status = !this.props.isArcHide;
              this.props.hideArcs(status);
            }}>
              {this.props.isArcHide ? "ПОКАЗАТЬ" : "СКРЫТЬ"} ОФЕРТЫ
            </div>
            </div>
            <div>
            <div class="button" onClick={() => {
              const status = !this.props.layers.zakaz;
              this.props.hideZakaz(status);
            }}>
              СТАТИСТИКА ПО ЗАКАЗЧИКАМ
            </div>
            </div>
            <div>
            <div class="button" onClick={() => {
              const status = !this.props.layers.postav;
              this.props.hidePostav(status);
            }}>
              СТАТИСТИКА ПО ПОСТАВЩИКАМ
            </div>
            </div>
            <div>
            <div class="button" onClick={() => {
              const status = !this.props.layers.oborot;
              this.props.hideOborot(status);
            }}>
              СТАТИСТИКА ПО ОБОРОТУ
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isArcHide: state.apollo.ArcLayer.isHide,
    layers: state.apollo.layers,
  };
};

export default connect(
  mapStateToProps,
  { hideArcs, hideOborot, hidePostav, hideZakaz },
)(MapBox);