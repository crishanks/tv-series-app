import Intro from '../../components/intro';
import React, { Component } from 'react';
import SeriesList from '../../components/series-list';
import Loader from '../../components/loader';

class Series extends Component {
    state = {
        series: [],
        seriesName: '',
        isFetching: false
      }

    onSeriesInputChange = a => {
        this.setState({ seriesName: a.target.value, isFetching: true })
        
        fetch(`http://api.tvmaze.com/search/shows?q=${a.target.value}`)
            .then(response => response.json())
            .then(json => this.setState({ series: json, isFetching: false }));
    }

    render() {
        const { series, seriesName, isFetching } = this.state;

        return (
           <div>
                <Intro message="Here you can find all of your most loved series" />
               <div>
                   <input value={seriesName} 
                   type='text' 
                   onChange={this.onSeriesInputChange} />
               </div>
               { 
                  !isFetching && series.length === 0 && seriesName.trim() === ''
                   &&
                   <p>Please enter series name into the input</p>
                }
                {
                    !isFetching && series.length === 0 && seriesName.trim() !== ''
                    &&
                    <p>No TV series has been found with this name</p>
                }
                {
                    isFetching && <Loader />
                }
                {
                    !isFetching && <SeriesList list={this.state.series} />
                }
           </div>
        )
    }
}

export default Series;