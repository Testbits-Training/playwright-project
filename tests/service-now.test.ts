import{ expect, test } from "@playwright/test";

test("Create an Incident", async ({request, baseURL}) => {

    const _response = await request.post(`${baseURL}`, {
        data: {
            "short_description": "hello man", 
            "category": "hardware"
        }
    })
    expect(_response.status()).toBe(201)
    expect(_response.ok()).toBeTruthy();
    console.log(await _response.json)
});