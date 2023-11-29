const puppeteer = require('puppeteer');
const fs = require('fs');

async function capturePanorama(lat, lng, pan) {
    // Puppeteer ������ ����
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // HTML ���� ��� ���� (���� ���� ��η� ���� �ʿ�)
    const filePath = 'file:///C:/Users/pc/Desktop/CE/KHUDA/KHUDA_4th_Project/pano.html';
    await page.goto(filePath);

    // createPanorama �Լ� ���� (������ ��ǥ �� pan �� ���)
    await page.evaluate((lat, lng, pan) => {
        window.createPanorama(lat, lng, pan);
    }, lat, lng, pan);

    // �ĳ�� �ε��� ���� ��� (��� �ð� ���� �ʿ�)
    await page.waitForTimeout(400);

    // ��ũ���� ĸó
    const screenshot = await page.screenshot();

    console.log(`Captured: lat ${lat}, lng ${lng}, pan ${pan}`);

    // ��ũ������ ���Ϸ� ����
    const filename = `screenshot_lat_${lat}_lng_${lng}_pan_${pan}.png`;
    require('fs').writeFileSync(filename, screenshot);

    console.log(`Captured: ${filename}`);

    // ������ �ݱ�
    await browser.close();
}

const panValues = [-180, -160, -140, -120, -100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100, 120, 140, 160, 180];

// ���� ���
const filePath = 'C:/Users/pc/Desktop/CE/KHUDA/KHUDA_4th_Project/pure_lat_lng.txt'; // ���� ���� ��η� �����ؾ� �մϴ�.

// ���Ͽ��� ��ǥ �б�
fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
        console.error('������ �д� ���� ������ �߻��߽��ϴ�.', err);
        return;
    }

    const lines = data.split('\n');
    for (const line of lines) {
        const [lat, lng] = line.split(' '); // ������ �������� ������ �浵 �и�

        // ������ �浵�� parseFloat()�� ���� ���ڷ� ��ȯ�Ͽ� capturePanorama �Լ� ȣ��
        for(const pan of panValues) {
            await capturePanorama(parseFloat(lat), parseFloat(lng), pan); // ���⼭ 0�� pan ���Դϴ�. �ʿ信 ���� ���� �����մϴ�.
        }

    }
});