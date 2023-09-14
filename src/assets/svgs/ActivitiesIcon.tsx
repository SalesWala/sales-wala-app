import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={35} height={35} fill="none" {...props}>
    <Path
      fill="red"
      d="m18.924 4.54 3.247 6.526c.239.472.695.8 1.222.874l7.293 1.062c.426.06.813.284 1.074.627.258.339.369.768.306 1.19-.05.35-.216.673-.468.921l-5.285 5.123a1.54 1.54 0 0 0-.468 1.405l1.301 7.202c.139.87-.437 1.69-1.3 1.855a1.704 1.704 0 0 1-1.042-.166l-6.506-3.39a1.705 1.705 0 0 0-1.536 0l-6.505 3.39c-.8.424-1.79.135-2.235-.653a1.65 1.65 0 0 1-.17-1.02l1.302-7.203a1.547 1.547 0 0 0-.468-1.407L3.4 15.756a1.581 1.581 0 0 1-.042-2.235l.042-.042c.25-.255.58-.417.936-.46l7.294-1.063c.525-.075.981-.4 1.222-.876l3.13-6.54c.279-.56.856-.908 1.484-.894h.195a1.627 1.627 0 0 1 1.262.895Z"
      opacity={0.4}
    />
    <Path
      fill="red"
      d="M17.488 27.587a1.788 1.788 0 0 0-.805.22L10.21 31.19a1.689 1.689 0 0 1-2.184-.673 1.613 1.613 0 0 1-.169-1.012l1.293-7.188a1.608 1.608 0 0 0-.467-1.422l-5.287-5.118a1.594 1.594 0 0 1 0-2.275c.25-.249.574-.412.922-.463l7.299-1.074a1.579 1.579 0 0 0 1.22-.876l3.173-6.622c.301-.534.88-.852 1.491-.819-.012.434-.012 23.645-.012 23.94Z"
    />
  </Svg>
);
export default SvgComponent;
