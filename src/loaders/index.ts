import express from "express";
import expressLoader from "./express";
import chalk from "chalk";

export default async({ expressApp }: {expressApp : express.Application})=>{
    expressLoader({ app: expressApp });
    console.log(chalk.yellowBright('Express loaded'));
   
}