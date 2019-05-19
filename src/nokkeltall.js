import React from 'react';

export default class NokkelTall extends React.Component {
    render() {

        const {value, title, subtitle} = this.props;
        return (
            <article className='nokkeltall'>
                <section className='nokkeltall-content'>
                    <div className='nokkeltall-number'>{value}</div>
                    <h3 className='nokkeltall-subtitle'>{subtitle}</h3>
                    <h2 className='nokkeltall-title'>{title}</h2>
                </section>
            </article>)
    }
};