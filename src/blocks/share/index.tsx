import * as React from 'react';
import {BlockProps} from '../..';
import {rule} from 'p4-css';
import SeoParse from '../../service/seo-parse';

const blockClass = rule({
  d: 'flex',
  flexDirection: 'column',
  background: '#F7F5EF',
  w: '100%',
  bdrad: '12px',
  pad: '20px',
  marginTop: '22px',
});

const topClass = rule({
  d: 'flex',
  alignItems: 'start',
});

const bottomClass = rule({
  font: '#757575',
  fontSize: '300',
  marginLeft: '28px'
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

const Share: React.FC<BlockProps> = ({url, renderWrap}) => {
  console.log('url',url)

  const [seoParse, setSeoParse] = React.useState<any>(null);

  const fetchData = async () => {
    const res = await SeoParse(url)
    console.log('seo',res)
    setSeoParse(res.data)
  }
  React.useEffect(() => {
    fetchData()
  }, [])

  const title = seoParse?.twitterTitle || seoParse?.ogTitle || seoParse?.title;
  const desc = seoParse?.twitterDesc || seoParse?.ogDesc || seoParse?.desc;
  let icon =
    seoParse?.icon.length > 1
      ? seoParse?.icon[1]
      : seoParse?.icon.length > 0
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
              <img className={iconClass} src={icon} alt="" />
            )}
            <div className={bottomClass}>
              {title && <div>{title}</div>}
              {desc && <div>{desc}</div>}
            </div>
          </div>
          {image && <img className={imageClass} src={image} alt="" />}
        </div>
    );
  }
};

export default Share;
