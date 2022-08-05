import React from "react"
import ContentLoader from "react-content-loader"

const PizzaBlockSkeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="138" r="138" />
    <rect x="0" y="293" rx="10" ry="10" width="280" height="22" />
    <rect x="0" y="325" rx="10" ry="10" width="280" height="88" />
    <rect x="7" y="426" rx="10" ry="10" width="92" height="27" />
    <rect x="114" y="426" rx="10" ry="10" width="163" height="31" />
  </ContentLoader>
)

export default PizzaBlockSkeleton;