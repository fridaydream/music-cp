import { NowRequest, NowResponse } from '@vercel/node'

// import { videoList } from '../../config/video-config'
const videoList = [{
  id: '3400001',
  author: '烨哥',
  title: 'CLS基于qiankun分享',
  date: '2020-06-19',
  url: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe_share/CLS%E5%9F%BA%E4%BA%8Eqiankun%E5%88%86%E4%BA%AB.mov',
  poster: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe-share-pic/qiankun.png',
}, {
  id: '3400002',
  author: '烨哥',
  title: 'CLS基于qiankun分享(下)',
  date: '2020-07-03',
  url: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe_share/CLS%E5%9F%BA%E4%BA%8Eqiankun%E5%88%86%E4%BA%AB%28%E4%B8%8B%29.mov',
  poster: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe-share-pic/qiankun.png',
}, {
  id: '3400003',
  author: '韩硕',
  title: 'passic分享',
  date: '2020-07-03',
  url: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe_share/passic%E5%88%86%E4%BA%AB-%E5%BD%95%E5%B1%8F.mov',
  poster: 'https://erp-1258916733.cos.ap-shanghai.myqcloud.com/fe-share-pic/passic.png',
}, {
  id: '3400007',
  author: '贤明',
  title: 'qiankun 整体源码浅析',
  date: '2020-07-28',
  url: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe_share/%E5%B1%8F%E5%B9%95%E5%BD%95%E5%88%B62020-07-24%20%E4%B8%8B%E5%8D%884.03.45.mov',
  poster: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe-share-pic/qiankun2.png',
}, {
  id: '3400004',
  author: '陈盼',
  title: 'canvas 旋转',
  date: '2020-06-23',
  url: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe_share/canvas_rotate.mov',
  poster: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe-share-pic/canvas_line.jpg',
}, {
  id: '3400005',
  author: '陈盼',
  title: 'canvas骑士轨迹',
  date: '2020-07-27',
  url: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe_share/canvas_story2.mov',
  poster: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe-share-pic/tract.png',
}, {
  id: '3400006',
  author: '陈盼',
  title: '骑士节星光轨迹',
  date: '2020-09-12',
  url: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe_share/%E9%AA%91%E5%A3%AB%E8%8A%82%E6%98%9F%E5%85%89%E8%BD%A8%E8%BF%B9.mov',
  poster: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe-share-pic/light.png',
}, {
  id: '3400008',
  author: '陈盼',
  title: 'ssr一期',
  date: '2020-09-12',
  url: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe_share/react-ssr.mov',
  poster: '//erp-1258916733.cos.ap-shanghai.myqcloud.com/fe-share-pic/ssr.png',
}]

export default (request: NowRequest, response: NowResponse) => {
  const id = request.query.id
  // 如果没有id，查询所有
  if (!id) {
    return response.status(200).json({
      data: videoList,
      errno: 0
    })
  }
  const result = videoList.find(li => li.id === id)
  if (result) {
    return response.status(200).json({
      data: result,
      errno: 0
    })
  }
  response.status(200).json({
    message: 'id is not exist',
    errno: 4004
  })
}
