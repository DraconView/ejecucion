import { useState, useEffect } from "react";
import Spinner from '../../components/spinner/Spinner'
import styled from "styled-components";

const Galeria = ({ item = [{ img: "" }] }) => {
  const [main, setMain] = useState(item[0]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (item === 0 ) {
        setLoading(true)
    } else {
        //console.log('hay datos')
        setLoading(false)
        //setMain(item)
        setMain(item[0])
    }
  }, [item])
 
  return (
    <> {loading === true ? <Spinner /> :
    <Wrapper>
      <img src={main.img} alt="main_image" className="main" />
      <div className="gallery">
        {item.map((image, index) => {
          return (
            <img
              className={`${image.img === main.img ? "active" : null}`}
              key={index}
              alt={image.filename}
              src={image.img}
              onClick={() => setMain(item[index])}
            />
          );
        })}
      </div>
    </Wrapper>
    }</>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
    background-color: #ffffff;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default Galeria;

/*
import { useState } from "react";
import styled from "styled-components";

const Galeria = ({ item = [{ url: "" }] }) => {
  const [main, setMain] = useState(item[0]);
//console.log(item, "imagespagina3");
  return (
    <Wrapper>
      <img src={main.url} alt="main_image" className="main" />
      <div className="gallery">
        {item.map((image, index) => {
          return (
            <img
              className={`${image.url === main.url ? "active" : null}`}
              key={index}
              alt={image.filename}
              src={image.url}
              onClick={() => setMain(item[index])}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default Galeria;
*/



