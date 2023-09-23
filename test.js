const axios = require('axios');
const assert = require('assert');

const apiUrl = 'https://l761dniu80.execute-api.us-east-2.amazonaws.com/default/exercise_api';

describe('CRUD Operations Test Suite', () => {

    it('should DELETE a key-value pair', async () => {
        const payload = { main_key: 'NewKey' };
        const response = await axios.delete(apiUrl, {
            headers: { 'Content-Type': 'application/json' },
            data: payload
        });
        assert.strictEqual(response.status, 200);
    });

    it('should PUT a new key-value pair', async () => {
        const payload = { main_key: 'NewKey', value: 'NewValue' };
        const response = await axios.put(apiUrl, payload, {
            headers: { 'Content-Type': 'application/json' }
        });
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.value, 'NewValue');
    });


    it('should POST and update a key value', async () => {
        const payload = { main_key: 'NewKey', value: 'UpdatedValue' };
        const response = await axios.post(apiUrl, payload, {
            headers: { 'Content-Type': 'application/json' }
        });
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.value, 'UpdatedValue');
    });

    it('should GET list of all values in the store', async () => {
        const response = await axios.get(apiUrl);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(Array.isArray(response.data), true);
    });


    it('should return 400 error if key is not in the store', async () => {
        const payload = { main_key: 'NonExistentKey', value: 'Value' };
        try {
            await axios.post(apiUrl, payload, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
        }
    });

    it('should return 400 error when quota is reached', async () => {
        const payload = { main_key: 'KeyExceedingQuota', value: 'Value' };
        try {
            await axios.put(apiUrl, payload, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            assert.strictEqual(error.response.status, 400);
        }
    });
});
