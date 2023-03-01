import React from 'react';


export default function (props) {
    const {perPage, page, total, limiters} = props;



    const {setPage, setPerPage} = props;


    if (!perPage) return <></>

    const delta = 3;
    const limitOfPagesForCompactView = 10;
    let numberOfPages = Math.ceil(total / perPage);


    const getPages = () => {
        let _pages = []
        if (numberOfPages >= limitOfPagesForCompactView && page > delta) {
            _pages.push(<a onClick={e => setPage(1)}>1</a>);
            _pages.push(<span>....</span>);
        }
        for (let i = 1; i <= numberOfPages; i++) {
            if (i == page) {
                _pages.push(<strong>{i}</strong>);
            } else {
                if (numberOfPages <= limitOfPagesForCompactView || (page - delta) < i && i < (page + delta)) {
                    _pages.push(<a onClick={e => setPage(i)}>{i}</a>);
                }
            }
        }
        if (numberOfPages >= limitOfPagesForCompactView && page < numberOfPages - delta) {
            _pages.push(<span>....</span>);
            _pages.push(<a onClick={e => setPage(numberOfPages)}>{numberOfPages}</a>);
        }
        return _pages;
    }



    return <div className={'data-grid-pager'}>
        {total} Record(s) found -
        <div className={'pages'}>{getPages().map(page => page)}</div>
        {limiters ?
            <div className={'limiter'}><select onChange={e => setPerPage(e.target.value)}>{limiters.map(limiter =>
                <option
                    value={limiter} selected={limiter == perPage}>{limiter}</option>)}</select></div> : null}
    </div>
}