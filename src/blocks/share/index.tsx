import * as React from 'react';
import {BlockProps} from '../..';
import {rule} from 'p4-css';
import axios from 'axios';

const blockClass = rule({
  d: 'flex',
  flexDirection: 'column',
  background: '#F7F5EF',
  w: '100%',
  bdrad: '12px',
  pad: '20px',
});

const topClass = rule({
  d: 'flex',
  alignItems: 'start',
});

const titleClass = rule({
  fontSize: '300',
  marginLeft: '28px'
});

const desClass = rule({
  color: '#757575',
  fontSize: '300',
  marginLeft: '28px',
  marginTop: '4px',
});

const iconClass = rule({
  w: '52px',
  h: '52px',
  bdrad: '12px',
  objectFit: 'cover',
});

const imageClass = rule({
  w: '100%',
  h: 'auto',
  bdrad: '12px',
  marginTop: '28px',
});

const Share: React.FC<BlockProps> = ({url, endPoint, showImage=true, renderWrap}) => {
  const [seoParse, setSeoParse] = React.useState<any>({});
  const fetchData = async () => {
    axios.get(`${endPoint}/api/v2/utils/seo-parse`, {
      params: {
        url
      }
    })
    .then(function (res) {
      console.log('seo',res)
      setSeoParse(res?.data?.data)
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  React.useEffect(() => {
    fetchData()
  }, [])

  const title = seoParse?.twitterTitle || seoParse?.ogTitle || seoParse?.title;
  const desc = seoParse?.twitterDesc || seoParse?.ogDesc || seoParse?.desc;
  let icon =
    seoParse?.icon?.length > 1
      ? seoParse?.icon[1]
      : seoParse?.icon?.length > 0
      ? seoParse?.icon[0]
      : '';
  if (icon && icon[0] !== 'h') {
    if (icon.includes('//')) {
      icon = icon.replace('//', 'http://');
    } else {
      const host = new URL(url);
      host.pathname = icon.replace('/', '');
      icon = host.href;
    }
  }
  const image = seoParse?.twitterImage || seoParse?.ogImage;

  if (!seoParse) {
    return renderWrap(null)
  } else {
    return renderWrap(
        <div className={blockClass}>
          <div className={topClass}>
            {icon && (
              <div className={iconClass} style={{ background: `url(${icon}) no-repeat`, backgroundSize: "100%"}}  />
            )}
            <div>
              {title && <div className={titleClass}>{title}</div>}
              {desc && <div className={desClass}>{desc}</div>}
            </div>
          </div>
          {showImage && image && <img className={imageClass} src={image} alt="" />}
        </div>
    );
  }
};

export default Share;
