import Router from 'koa-router'
import { verifyRequest } from '@shopify/koa-shopify-auth'
import bodyParser from 'koa-bodyparser'
import Shopify, { ApiVersion } from '@shopify/shopify-api'

import { getShop, updateShop } from './db'
const router = new Router({
    prefix: '/api',
})

router.use(bodyParser())
router.use(verifyRequest({ returnHeader: true }))

router.get('/shop', async (ctx) => {
    const { shop } = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res)

    const body = await getShop(shop)

    ctx.response.status = 200
    ctx.response.body = body
})

router.post('/shop', async (ctx) => {
    console.log(ctx)
    const { shop } = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res)

    await updateShop(shop, ctx.request.body)
    const body = await getShop(shop)

    ctx.response.status = 200
    ctx.response.body = body
})

export default router
