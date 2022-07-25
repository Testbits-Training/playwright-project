const { expect, test } = require("@playwright/test");


test('GET LIST USERS', async ({ request, baseURL}) => {
    // Create request
    const getRequest = await request.get(`${baseURL}api/users?page=2`);
    //check status
    expect(getRequest.ok()).toBeTruthy;
    expect(getRequest.status()).toBe(200);
  });

test('GET SINGLE USERS', async ({ request, baseURL}) => {
    // Create request
    const getRequest = await request.get(`${baseURL}api/users/2`);
    //check status
    expect(getRequest.ok()).toBeTruthy;
    expect(getRequest.status()).toBe(200);
});

test('GET SINGLE USERS NOT FOUND', async ({ request, baseURL}) => {
    // Create request
    const getRequest = await request.get(`${baseURL}api/users/23`);
    //check status
    expect(getRequest.ok()).toBeTruthy;
    expect(getRequest.status()).toBe(404);
});

test('POST CREATE USER', async ({ request, baseURL}) => {
    // Create request
    const postRequest = await request.post(`${baseURL}api/users/`, {
        data: {
        "name": "siti",
        "job": "leader"
        }
    });
    //check status
    expect(postRequest.ok()).toBeTruthy;
    expect(postRequest.status()).toBe(201);
    //verify property
    expect(await postRequest.json()).toHaveProperty('name','siti');
    expect(await postRequest.json()).toHaveProperty('job','leader');
});

test('PUT UPDATE USER', async ({ request, baseURL}) => {
    // Create request
    const putRequest = await request.put(`${baseURL}api/users/2`, {
        data: {
        "name": "ahmad",
        "job": "HR"
        }
    });
    //check status
    expect(putRequest.ok()).toBeTruthy;
    expect(putRequest.status()).toBe(200);
    //verify property
    expect(await putRequest.json()).toHaveProperty('name','ahmad');
    expect(await putRequest.json()).toHaveProperty('job','HR');
});

test('PATCH UPDATE USER', async ({ request, baseURL}) => {
    // Create request
    const patchRequest = await request.patch(`${baseURL}api/users/2`, {
        data: {
        "name": "ahmad",
        "job": "Executive"
        }
    });
    //check status
    expect(patchRequest.ok()).toBeTruthy;
    expect(patchRequest.status()).toBe(200);
    //verify property
    expect(await patchRequest.json()).toHaveProperty('name','ahmad');
    expect(await patchRequest.json()).toHaveProperty('job','Executive');
});


test('DELETE USER', async ({ request, baseURL}) => {
    // Create request
    const deleteRequest = await request.delete(`${baseURL}api/users/2`);
    //check status
    expect(deleteRequest.ok()).toBeTruthy;
    expect(deleteRequest.status()).toBe(204);
});

test('POST REGISTER CREATE USER - Successfull', async ({ request, baseURL}) => {
    // Create request
    const postRequest = await request.post(`${baseURL}api/register`, {
        data: {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
    });
    //check status
    expect(postRequest.ok()).toBeTruthy;
    expect(postRequest.status()).toBe(200);
    //verify property
    expect(await postRequest.json()).toHaveProperty('id',4);
    expect(await postRequest.json()).toHaveProperty('token','QpwL5tke4Pnpja7X4');
});

test('POST REGISTER CREATE USER - Unsuccessfull', async ({ request, baseURL}) => {
    // Create request
    const postRequest = await request.post(`${baseURL}api/register`, {
        data: {
            "email": "sydney@fife"
        }
    });
    //check status
    expect(postRequest.ok()).toBeTruthy;
    expect(postRequest.status()).toBe(400);
    //verify property
    expect(await postRequest.json()).toHaveProperty('error','Missing password');
});

test('POST LOGIN - Successfull', async ({ request, baseURL}) => {
    // Create request
    const postRequest = await request.post(`${baseURL}api/register`, {
        data: {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
    });
    //check status
    expect(postRequest.ok()).toBeTruthy;
    expect(postRequest.status()).toBe(200);
    //verify property
    expect(await postRequest.json()).toHaveProperty('token','QpwL5tke4Pnpja7X4');
});

test('POST LOGIN - Unsuccessfull', async ({ request, baseURL}) => {
    // Create request
    const postRequest = await request.post(`${baseURL}api/register`, {
        data: {
            "email": "peter@klaven"
        }
    });
    //check status
    expect(postRequest.ok()).toBeTruthy;
    expect(postRequest.status()).toBe(400);
    //verify property
    expect(await postRequest.json()).toHaveProperty('error','Missing password');
});