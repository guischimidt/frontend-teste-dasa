import bus from '../utils/bus.jsx';

export default function useLoading() {
    function setLoading(param) {
        console.log(param);
        bus.emit('loading', {
            show: param
        })
    }

    return { setLoading };
};