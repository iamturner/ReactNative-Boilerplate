import React, { Component } from 'react';
import { ScrollView, Text, View, Dimensions, ActivityIndicator } from 'react-native';

export class InfiniteScroll extends React.Component {
    
    static start() {
        
        _this.setState({
            loading: true
        })
    }
    
    static stop() {
        
        _this.setState({
            loading: false
        })
    }
    
    constructor(props, context) {
        
        super(props, context);
        
        this.state = {
            scrollViewHeight: 0, 
            scrollViewContentHeight: 0, 
            scrollPos: { y: 0, x: 0 }, 
            loading: false
        }
        
        _this = this;
    }
        
    _measureScrollView = (e) => {
        
        let height = e.nativeEvent.layout.height;
        
        if (this.state.scrollViewHeight != height) {
            
            this.setState({
                scrollViewHeight: height
            })	
        }
    }
    
    _scrollHandler = (event) => {
        
        this.setState({
            scrollPos: event.nativeEvent.contentOffset
        }, () => {
            
            if ( 
                this.state.scrollViewContentHeight > this.state.scrollViewHeight && 
                this.state.scrollViewContentHeight - ( this.state.scrollViewHeight + this.state.scrollPos.y ) <= 20 
            ) {
                
                this._hasReachedBottom();
            }
        });
    }
    
    _hasReachedBottom = () => {
        
        if (this.state.loading == true || this.props.complete == true) { return }
        
        this.setState({
            loading: true
        }, () => {
            
            if (this.props.onReachedBottom) {
            
                this.props.onReachedBottom()
            }
        })
        
    }
    
    render() {
        return (
            <ScrollView 
                {...this.props}
                onScroll={this._scrollHandler}
                onLayout={this._measureScrollView}
                onContentSizeChange={(width, height) => { this.setState({ scrollViewContentHeight: height }) }}>
                { this.props.children }
                { this.state.loading && <ActivityIndicator style={{ marginVertical: 20 }} /> }
            </ScrollView>
        )
    }
    
}