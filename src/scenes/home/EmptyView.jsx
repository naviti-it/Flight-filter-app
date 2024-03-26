import noData from '../../assets/NoDataFound.jpg'

const EmptyView = () => (
    <div className='emptyView-wrap'>
        <img src={noData} alt='' />
    </div>
);

export default EmptyView;