import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card";
  


const CardCom = ({title, data} : {title: string, data: number}) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle> {title} </CardTitle>
          <CardDescription> {data} </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default CardCom;