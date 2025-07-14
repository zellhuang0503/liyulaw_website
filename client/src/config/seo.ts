// 全站 SEO 與結構化資料共用設定
// 後續若資訊變動僅需修改此檔即可
export const siteMeta = {
  url: 'https://liyulaw.netlify.app', // TODO: 部署後替換
  name: '理宇法律事務所',
  legalName: 'LIYU Attorneys at Law',
  logo: '/images/libra-law-LOGO.png',
  phone: '(02)2312-2308',
  fax: '(02)2312-2307',
  address: {
    street: '博愛路49號7樓',
    locality: '台北市',
    region: '台北市',
    postalCode: '10002',
    country: 'TW',
  },
  sameAs: [
    // 官方社群連結，可依需求增減
    'https://www.facebook.com/',
  ],
  defaultTitle: '理宇法律事務所｜專業法律服務',
  defaultDescription: '理宇法律事務所提供刑事、民事、家事及企業法務等專業法律服務，並分享最新法律知識。',
} as const
