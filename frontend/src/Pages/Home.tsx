import { FunctionComponent } from "react";

interface HomePageProps {
  name?: string
  className?: string
}

const HomePage :  FunctionComponent<HomePageProps> = ({
  className = '',
}) => {
  return (
    <h1 className={className} >Home Page</h1>
  )
}

HomePage.defaultProps = {
  name : 'world'
}

export default HomePage;
