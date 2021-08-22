import jquery from "jquery";
import axios from 'axios';
import store from '@/store';
export default function moveImage() {
    let assets = store.state.assetsapi;
    let imageHub = [];
    const img = jquery('#set_image img');
    jquery.each(img, function (i, el) {
        const src = jquery(el).attr('data-src').replace(assets + '/image/', '');
        imageHub.push(src);
    });
    let data;
    axios.post(`${assets}/moveTemporaryImages`, {
        images: imageHub
    })
    return data;
}