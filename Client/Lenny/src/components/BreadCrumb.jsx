import { Breadcrumb, ConfigProvider } from 'antd'
import React from 'react'
import "../style/BreadCrumb.scss"

const BreadCrumb = ({items}) => {
  return (
    <ConfigProvider
    theme={{
      components: {
        Breadcrumb: {
          linkColor:"#1D9E34",
        }
      },
    }}
  >
      <Breadcrumb  className='breadcrumb' items={items}/>
      </ConfigProvider>
  )
}

export default BreadCrumb