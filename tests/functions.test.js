import { ASSET_URL, BASE_URL } from '../src/utils/constant';
import { 
  acceptableLabels, 
  acceptableText, 
  checkCamera, 
  checkForMultipleMicrophones, 
  checkNotification, 
  dataURLtoFile, 
  detectMultipleScreens,
  detectWindowResize,
  disableCopyPasteCut,
  findConfigs,
  forceFullScreen,
  getCPUInfo,
  getLocation,
  getMultipleCameraDevices,
  getNetworkUploadSpeed, 
  getRAMInfo, 
  getTimeInSeconds, 
  preventRightClick, 
  preventShortCuts, 
  registerEvent, 
  shareScreenFromContent, 
  showNotification, 
  srcToData, 
  stopPrinting, 
  updatePersistData, 
  uploadFileInS3Folder, 
  userRekognitionInfo 
} from '../src/utils/functions';
import axios from 'axios';

describe('detectMultipleScreens', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return true if window.screen.isExtended is true', async () => {
    Object.defineProperty(window, 'screen', {
      writable: true,
      value: { isExtended: true },
    });

    const result = await detectMultipleScreens();
    expect(result).toBe(true);
  });

  it('should return false if window.screen.isExtended is false', async () => {
    Object.defineProperty(window, 'screen', {
      writable: true,
      value: { isExtended: false },
    });

    const result = await detectMultipleScreens();
    expect(result).toBe(false);
  });

  it('should return false if window.screen.isExtended is undefined', async () => {
    Object.defineProperty(window, 'screen', {
      writable: true,
      value: {},
    });

    const result = await detectMultipleScreens();
    expect(result).toBe(false);
  });
});

jest.mock('axios');

describe('getNetworkUploadSpeed', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate and return upload speed in Mbps when testUploadSpeed succeeds', async () => {
    axios.post.mockResolvedValue({ data: true });

    const result = await getNetworkUploadSpeed();

    expect(result).toHaveProperty('speedMbps');
    expect(typeof result.speedMbps).toBe('string');
    expect(parseFloat(result.speedMbps)).toBeGreaterThan(0);
  });

  it('should return false when testUploadSpeed fails', async () => {
    axios.post.mockRejectedValue(new Error('Network error'));

    const result = await getNetworkUploadSpeed();

    expect(result).toBe(false);
  });

});

describe('getTimeInSeconds', () => {
  it('should return time in milliseconds for the given date when isUTC is false', () => {
    const inputDate = new Date('2023-01-01T00:00:00Z');
    const result = getTimeInSeconds({ isUTC: false, inputDate });
    const expected = inputDate.getTime();
    expect(result).toBe(expected);
  });

  it('should return time in milliseconds adjusted to UTC when isUTC is true', () => {
    const inputDate = new Date('2023-01-01T00:00:00Z');
    const timezoneOffset = inputDate.getTimezoneOffset() * 60 * 1000;
    const result = getTimeInSeconds({ isUTC: true, inputDate });
    const expected = inputDate.getTime() - timezoneOffset;
    expect(result).toBe(expected);
  });

  it('should handle the current date when no inputDate is provided', () => {
    const now = new Date();
    const result = getTimeInSeconds({ isUTC: false });
    const expected = now.getTime();
    expect(result).toBe(expected);
  });

  it('should handle the current date and adjust to UTC when isUTC is true and no inputDate is provided', () => {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; 
    const result = getTimeInSeconds({ isUTC: true });
    const expected = now.getTime() - timezoneOffset;
    expect(result).toBe(expected);
  });

  it('should correctly process a custom date when isUTC is true', () => {
    const customDate = new Date('2024-07-01T12:00:00'); // Local time
    const timezoneOffset = customDate.getTimezoneOffset() * 60 * 1000; 
    const result = getTimeInSeconds({ isUTC: true, inputDate: customDate });
    const expected = customDate.getTime() - timezoneOffset;
    expect(result).toBe(expected);
  });

  it('should correctly process a custom date when isUTC is false', () => {
    const customDate = new Date('2024-07-01T12:00:00');
    const result = getTimeInSeconds({ isUTC: false, inputDate: customDate });
    const expected = customDate.getTime();
    expect(result).toBe(expected);
  });
});

describe('getLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with latitude and longitude when geolocation succeeds', async () => {
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
    };
    navigator.geolocation = {
      getCurrentPosition: jest.fn((successCallback) => {
        successCallback(mockPosition);
      }),
    };

    const result = await getLocation();

    expect(result).toEqual({
      latitude: mockPosition.coords.latitude,
      longitude: mockPosition.coords.longitude,
    });
  });

  it('should resolve with false when geolocation fails', async () => {
    navigator.geolocation = {
      getCurrentPosition: jest.fn((_successCallback, errorCallback) => {
        errorCallback(new Error('Geolocation error'));
      }),
    };

    const result = await getLocation();

    expect(result).toBe(false);
  });
});


describe('showNotification', () => {
  beforeAll(() => {
    global.Notification = jest.fn();
    global.console = {
      ...console,
      log: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a notification with default parameters', () => {
    showNotification({});

    expect(global.Notification).toHaveBeenCalled();
    
    const notificationArgs = global.Notification.mock.calls[0][1];

    expect(notificationArgs).toEqual({
      body: 'How you doing?',
      icon: `${ASSET_URL}/mereos.png`,
    });
  });

  it('should create a notification with custom parameters', () => {
    const title = 'Custom Title';
    const body = 'Custom Body';
    const icon = 'https://example.com/custom-icon.png';

    showNotification({ title, body, icon });

    expect(global.Notification).toHaveBeenCalledWith(
      title,
      {
        body: body,
        icon: icon,
      }
    );
  });
});


describe('userRekognitionInfo', () => {
  test('test user Rekognization face detected',async () =>{
    const fileObj = new Blob(['dummy content'], { type: 'image/jpeg' });
    axios.post.mockResolvedValue({
      data: {
        face: {
          FaceDetails: [{}]
        }
      }
    });

    const data = new FormData();
    data.append('image', fileObj, 'test-image.jpg');
    const resp = await userRekognitionInfo(data);
    expect(resp.data?.face?.FaceDetails?.length).toBe(1);
  })
  test('test user Rekognization face not detected',async () =>{
    const fileObj = new Blob(['dummy content'], { type: 'image/jpeg' });
    axios.post.mockResolvedValue({
      data: {
        face: {
          FaceDetails: []
        }
      }
    });

    const data = new FormData();
    data.append('image', fileObj, 'test-image.jpg');
    const resp = await userRekognitionInfo(data);
    expect(resp.data?.face?.FaceDetails?.length).toBe(0);
  })
  test('test user Rekognization multiple face detected',async () =>{
    const fileObj = new Blob(['dummy content'], { type: 'image/jpeg' });
    axios.post.mockResolvedValue({
      data: {
        face: {
          FaceDetails: [{},{}]
        }
      }
    });

    const data = new FormData();
    data.append('image', fileObj, 'test-image.jpg');
    const resp = await userRekognitionInfo(data);
    expect(resp.data?.face?.FaceDetails?.length).toBe(2);
  })
})

describe('acceptableLabels', () => {
  test('accepted label detected in the photo',async () => {
    const label={
      Labels:[{Name:"Text",Confidence:98.94842529296875},{Name:"Face",Confidence:98.0716552734375}]
    }
    const acceptValues = acceptableLabels(label, 80);
    expect(acceptValues).toBe(true);
  });

  test('accepted label not detected in the photo',async () => {
    const label={
      Labels:[]
    }
    const acceptValues = acceptableLabels(label, 80);
    expect(acceptValues).toBe(false);
  });

  test('invalid label data', () => {
    const label = null;
    const acceptValues = acceptableLabels(label, 80);
    expect(acceptValues).toBe(false);
  });
})

describe('acceptableTexts', () => {
  test('accepted text detected in the photo',async () => {
    const label={
      TextDetections:[{Name:"Text",Confidence:99.35012817382812},{Name:"Face",Confidence:99.61145782470703},{Name:'CARTE NATIONALE D',Confidence:86.57442474365234}]
    }
    const acceptValues = acceptableText(label, 59);
    expect(acceptValues).toBe(true);
  });

  test('accepted text not detected in the photo',async () => {
    const label={
      TextDetections:[]
    }
    const acceptValues = acceptableText(label, 80);
    expect(acceptValues).toBe(false);
  });

  test('invalid text data', () => {
    const label = null;
    const acceptValues = acceptableLabels(label, 80);
    expect(acceptValues).toBe(false);
  });
})

describe('shareScreenFromContent', () => {
  const mockGetDisplayMedia = jest.fn();

  beforeAll(() => {
    navigator.mediaDevices = {
      getDisplayMedia: mockGetDisplayMedia,
    };
  });

  test('should resolve with a stream when getDisplayMedia succeeds', async () => {
    class MediaStream {
    }
    const mockStream = new MediaStream();
    mockGetDisplayMedia.mockResolvedValue(mockStream);

    const result = await shareScreenFromContent();

    expect(result).toBe(mockStream);
  });

  test('should reject with an error when getDisplayMedia fails', async () => {
    const mockError = new Error('Failed to get display media');
    mockGetDisplayMedia.mockRejectedValue(mockError);

    await expect(shareScreenFromContent()).rejects.toThrow('Failed to get display media');
  });
});

describe('checkForMultipleMicrophones', () => {
  const mockGetUserMedia = jest.fn();
  const mockEnumerateDevices = jest.fn();

  beforeAll(() => {
    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        getUserMedia: mockGetUserMedia,
        enumerateDevices: mockEnumerateDevices,
      },
      writable: true,
    });
  });

  beforeEach(() => {
    mockGetUserMedia.mockClear();
    mockEnumerateDevices.mockClear();
  });

  test('should return default microphone when available', async () => {
    const mockMicrophones = [
      { deviceId: 'default', kind: 'audioinput', label: 'Default Microphone' },
      { deviceId: 'mic1', kind: 'audioinput', label: 'Microphone 1' }
    ];

    mockGetUserMedia.mockResolvedValueOnce({});
    mockEnumerateDevices.mockResolvedValueOnce(mockMicrophones);

    const result = await checkForMultipleMicrophones();
    expect(result).toContainEqual({ deviceId: 'default', kind: 'audioinput', label: 'Default Microphone' });
  });

  test('should return the first microphone when no default is available', async () => {
    const mockMicrophones = [
      { deviceId: 'mic1', kind: 'audioinput', label: 'Microphone 1' },
      { deviceId: 'mic2', kind: 'audioinput', label: 'Microphone 2' }
    ];

    mockGetUserMedia.mockResolvedValueOnce({});
    mockEnumerateDevices.mockResolvedValueOnce(mockMicrophones);

    const result = await checkForMultipleMicrophones();
    expect(result).toContainEqual({ deviceId: 'mic1', kind: 'audioinput', label: 'Microphone 1' });
  });

  test('should return an empty array when no microphones are found', async () => {
    mockGetUserMedia.mockResolvedValueOnce({});
    mockEnumerateDevices.mockResolvedValueOnce([]);

    const result = await checkForMultipleMicrophones();
    expect(result).toEqual([]);
  });

  test('should handle permission errors', async () => {
    const mockError = new Error('Permission denied');
    mockError.name = 'NotAllowedError';
    mockGetUserMedia.mockRejectedValueOnce(mockError);

    const result = await checkForMultipleMicrophones();
    expect(result).toEqual([]);
  });

  test('should handle general errors', async () => {
    const mockError = new Error('General error');
    mockGetUserMedia.mockRejectedValueOnce(mockError);

    const result = await checkForMultipleMicrophones();
    expect(result).toEqual([]);
  });
});

describe('uploadFileInS3Folder', () => {
  const mockLocalStorage = {};

  beforeAll(() => {
    global.localStorage = {
      getItem: jest.fn((key) => mockLocalStorage[key]),
    };

    mockLocalStorage['token'] = 'mock-token';
  });

  test('should upload file and return response when successful', async () => {
    const mockResponse = { data: { success: true } };
    axios.post.mockResolvedValue(mockResponse);

    const mockFile = new Blob(['file content'], { type: 'text/plain' });
    const data = {
      file: mockFile,
      folderName: 'test-folder',
    };

    const response = await uploadFileInS3Folder(data);

    expect(response).toBe(mockResponse);
  });

  test('should handle error response from upload', async () => {
    const mockError = new Error('Upload failed');
    axios.post.mockRejectedValue(mockError);

    const mockFile = new Blob(['file content'], { type: 'text/plain' });
    const data = {
      file: mockFile,
      folderName: 'test-folder',
    };

    await expect(uploadFileInS3Folder(data)).rejects.toThrow('Upload failed');
  });
});


describe('dataURLtoFile', () => {
  test('should convert data URL to File object', () => {
    const dataurl = 'data:text/plain;base64,SGVsbG8gd29ybGQ=';
    const filename = 'hello.txt';
    
    const file = dataURLtoFile(dataurl, filename);
    
    expect(file.name).toBe(filename);
    
    expect(file.type).toBe('text/plain');
    
    const reader = new FileReader();
    reader.onload = () => {
      expect(reader.result).toBe('Hello world');
    };
    reader.readAsText(file);
  });
});


describe('srcToData', () => {
	beforeEach(() => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				blob: () => Promise.resolve(new Blob(['Hello world'], { type: 'text/plain' })),
			})
		);

		jest.spyOn(global, 'FileReader').mockImplementation(function () {
			this.readAsDataURL = jest.fn().mockImplementation((blob) => {
				this.result = 'data:text/plain;base64,SGVsbG8gd29ybGQ=';
				this.onloadend();
			});
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('should convert src to data URL', async () => {
		const src = 'https://example.com/hello.txt';

		const result = await srcToData(src);

		expect(result).toBe('data:text/plain;base64,SGVsbG8gd29ybGQ=');

		expect(fetch).toHaveBeenCalledWith(src);
	});
});



describe('checkCamera', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should resolve with a stream when getUserMedia is successful', async () => {
		const mockStream = {};
		navigator.mediaDevices = {
			getUserMedia: jest.fn().mockResolvedValue(mockStream),
		};

		const result = await checkCamera();

		expect(result).toBe(mockStream);
		expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ video: true });
	});

	test('should resolve with false when getUserMedia throws an error', async () => {
		const mockError = new Error('Permission denied');
		navigator.mediaDevices = {
			getUserMedia: jest.fn().mockRejectedValue(mockError),
		};
		console.log = jest.fn();

		const result = await checkCamera();

		expect(result).toBe(false);
		expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ video: true });
		expect(console.log).toHaveBeenCalledWith('Error checking camera:', mockError);
	});

	test('should resolve with false when getUserMedia is not supported', async () => {
		delete navigator.mediaDevices;
		console.log = jest.fn();

		const result = await checkCamera();

		expect(result).toBe(false);
		expect(console.log).toHaveBeenCalledWith('getUserMedia is not supported');
	});

	test('should resolve with a stream when older getUserMedia is successful', async () => {
		const mockStream = {};
		const getUserMediaMock = jest.fn((constraints, successCallback) => successCallback(mockStream));
		navigator.getUserMedia = getUserMediaMock;

		const result = await checkCamera();

		expect(result).toBe(mockStream);
		expect(getUserMediaMock).toHaveBeenCalledWith({ video: true }, expect.any(Function), expect.any(Function));
	});

	test('should resolve with false when older getUserMedia throws an error', async () => {
		const mockError = new Error('Permission denied');
		const getUserMediaMock = jest.fn((constraints, successCallback, errorCallback) => errorCallback(mockError));
		navigator.getUserMedia = getUserMediaMock;
		console.log = jest.fn();

		const result = await checkCamera();

		expect(result).toBe(false);
		expect(getUserMediaMock).toHaveBeenCalledWith({ video: true }, expect.any(Function), expect.any(Function));
		expect(console.log).toHaveBeenCalledWith('Error checking camera:', mockError);
	});
});

describe('checkNotification', () => {
  let originalNotification;

  beforeAll(() => {
    originalNotification = global.Notification;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.Notification = originalNotification;
  });

  test('should resolve false if Notification is not supported', async () => {
    delete global.Notification;

    const result = await checkNotification();

    expect(result).toBe(false);
  });

  test('should resolve true and show notification if permission is granted', async () => {
    const showNotification = jest.fn();
    global.showNotification = showNotification;

    Object.defineProperty(global, 'Notification', {
      value: class {
        static permission = 'granted';
        static requestPermission = jest.fn().mockResolvedValue('granted');
        constructor() {}
      },
      writable: true,
      configurable: true
    });

    const result = await checkNotification();

    expect(result).toBe(true);
   
  });

  test('should resolve true if permission is granted after request', async () => {
    const showNotification = jest.fn();
    global.showNotification = showNotification;

    Object.defineProperty(global, 'Notification', {
      value: class {
        static permission = 'default';
        static requestPermission = jest.fn().mockResolvedValue('granted');
        constructor() {}
      },
      writable: true,
      configurable: true
    });

    const result = await checkNotification();

    expect(result).toBe(true);
    
  });

  test('should resolve false if permission is denied after request', async () => {
    const showNotification = jest.fn();
    global.showNotification = showNotification;

    Object.defineProperty(global, 'Notification', {
      value: class {
        static permission = 'default';
        static requestPermission = jest.fn().mockResolvedValue('denied');
        constructor() {}
      },
      writable: true,
      configurable: true
    });

    const result = await checkNotification();

    expect(result).toBe(false);
  });

});

describe('getMultipleCameraDevices', () => {
  const mockGetUserMedia = jest.fn();
  const mockEnumerateDevices = jest.fn();

  beforeAll(() => {
    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        getUserMedia: mockGetUserMedia,
        enumerateDevices: mockEnumerateDevices,
      },
      writable: true,
    });
  });

  beforeEach(() => {
    mockGetUserMedia.mockClear();
    mockEnumerateDevices.mockClear();
  });

  test('should return default camera when available', async () => {
    const mockMicrophones = [
      {
        deviceId: "08ac93d53aab98bd7ce6bb37507729c99cace8a110d716cd5825edbcbfa6014a",
        groupId: "8ecdca63d041f42878e879b10c16c8169da5b651332527a3bd24bb861903abc5",
        kind: "videoinput",
        label: "Integrated Webcam (1bcf:28b8)"
      },
      {
        deviceId: "c64522cc84d663f7c0a64ec46f0accff3c89ecea05983ba961e260fb843f3de6",
        groupId: "62368d555edd26cbec0833f03810a6db516d4e92e504cd47faa32d364eca0274",
        kind: "videoinput",
        label: "DroidCam Source 3"
      },
    ];

    mockGetUserMedia.mockResolvedValueOnce({});
    mockEnumerateDevices.mockResolvedValueOnce(mockMicrophones);

    const result = await getMultipleCameraDevices();
    expect(result).toContainEqual(
      {
      deviceId: "08ac93d53aab98bd7ce6bb37507729c99cace8a110d716cd5825edbcbfa6014a",
      groupId: "8ecdca63d041f42878e879b10c16c8169da5b651332527a3bd24bb861903abc5",
      kind: "videoinput",
      label: "Integrated Webcam (1bcf:28b8)"
      });
  });

  test('should return an empty array when no cameras are found', async () => {
    mockEnumerateDevices.mockResolvedValue([]);

    const result = await getMultipleCameraDevices();
    
    expect(result).toEqual([]);
  });

  test('should handle errors in enumerating devices', async () => {
    const mockError = new Error('Enumeration error');
    mockEnumerateDevices.mockRejectedValue(mockError);

    try {
      await getMultipleCameraDevices();
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });
});

describe('getCPUInfo', () => {
  let originalHardwareConcurrency;

  beforeAll(() => {
    originalHardwareConcurrency = navigator.hardwareConcurrency;
  });

  beforeEach(() => {
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 8,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: originalHardwareConcurrency,
    });
  });

  it('should resolve with the number of logical processor cores', async () => {
    const cpuInfo = await getCPUInfo();
    expect(cpuInfo).toBe(8);
  });
});

describe('getRAMInfo', () => {
  let originalRAMConcurrency;

  beforeAll(() => {
    originalRAMConcurrency = navigator.deviceMemory;
  });

  beforeEach(() => {
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 8,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'deviceMemory', {
      value: originalRAMConcurrency,
    });
  });

  it('should resolve with the number of logical processor cores', async () => {
    const cpuRAM = await getRAMInfo();
    expect(cpuRAM).toBe(8);
  });
});

describe('forceFullScreen', () => {
  let originalRequestFullscreen;
  let originalWebkitRequestFullscreen;
  let originalMsRequestFullscreen;
  let originalBody;
  let eventListenerMock;

  beforeEach(() => {
    originalRequestFullscreen = document.documentElement.requestFullscreen;
    originalWebkitRequestFullscreen = document.documentElement.webkitRequestFullscreen;
    originalMsRequestFullscreen = document.documentElement.msRequestFullscreen;

    document.documentElement.requestFullscreen = jest.fn();
    document.documentElement.webkitRequestFullscreen = jest.fn();
    document.documentElement.msRequestFullscreen = jest.fn();

    originalBody = document.body;
    document.body = document.createElement('body');

    eventListenerMock = jest.fn();
    document.addEventListener = jest.fn((event, callback) => {
      if (event === 'fullscreenchange') {
        eventListenerMock = callback;
      }
    });
  });

  afterEach(() => {
    document.documentElement.requestFullscreen = originalRequestFullscreen;
    document.documentElement.webkitRequestFullscreen = originalWebkitRequestFullscreen;
    document.documentElement.msRequestFullscreen = originalMsRequestFullscreen;

    document.body = originalBody;

    const whiteBackgroundElement = document.body.querySelector('div');
    if (whiteBackgroundElement) {
      document.body.removeChild(whiteBackgroundElement);
    }
  });

  it('should request fullscreen and add a white background element', () => {
    forceFullScreen();

    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
    expect(document.documentElement.webkitRequestFullscreen).not.toHaveBeenCalled();
    expect(document.documentElement.msRequestFullscreen).not.toHaveBeenCalled();

    const whiteBackgroundElement = document.body.querySelector('div');
    expect(whiteBackgroundElement).not.toBeNull();
    expect(whiteBackgroundElement.style.backgroundColor).toBe('white');
    expect(whiteBackgroundElement.style.top).toBe('0px');
    expect(whiteBackgroundElement.style.left).toBe('0px');
    expect(whiteBackgroundElement.style.width).toBe('100%');
    expect(whiteBackgroundElement.style.height).toBe('100%');
    expect(whiteBackgroundElement.style.overflow).toBe('auto');
    expect(whiteBackgroundElement.style.zIndex).toBe('1000');
  });

  it('should remove the white background element when exiting fullscreen', () => {
    forceFullScreen();

    const whiteBackgroundElement = document.createElement('div');
    document.body.appendChild(whiteBackgroundElement);

    document.fullscreenElement = null;
    eventListenerMock(); 

    expect(document.body.querySelector('div')).not.toBeNull();
  });
});

describe('preventShortCuts', () => {
  let preventDefaultMock;
  let stopPropagationMock;

  beforeEach(() => {
    preventDefaultMock = jest.fn();
    stopPropagationMock = jest.fn();
    
    document.onkeydown = null;

    globalThis.Event = jest.fn().mockImplementation((type, eventInit) => ({
      type,
      ...eventInit,
      preventDefault: preventDefaultMock,
      stopPropagation: stopPropagationMock,
    }));
  });

  it('should prevent default and stop propagation for blocked keys', async () => {
    await preventShortCuts();

    const blockedKeys = [
      27, 91, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 44, 173, 174, 145
    ];

    blockedKeys.forEach((keyCode) => {
      const event = new Event('keydown', { keyCode });
      document.onkeydown(event);

      expect(preventDefaultMock).toHaveBeenCalled();
      expect(stopPropagationMock).toHaveBeenCalled();
    });
  });

  it('should allow function keys that are in the allowed list', async () => {
    const allowedFunctionKeys = [113, 116];
    await preventShortCuts(allowedFunctionKeys);

    const allowedKeys = [113, 116];
    const blockedKeys = [112, 114, 115, 117, 118, 119, 120, 121, 122, 123];

    allowedKeys.forEach((keyCode) => {
      const event = new Event('keydown', { keyCode });
      document.onkeydown(event);

      expect(preventDefaultMock).not.toHaveBeenCalled();
      expect(stopPropagationMock).not.toHaveBeenCalled();
    });

    blockedKeys.forEach((keyCode) => {
      const event = new Event('keydown', { keyCode });
      document.onkeydown(event);

      expect(preventDefaultMock).toHaveBeenCalled();
      expect(stopPropagationMock).toHaveBeenCalled();
    });
  });

  it('should handle Ctrl/Meta + alphabet keys', async () => {
    await preventShortCuts();

    const alphabetKeys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    alphabetKeys.forEach((key) => {
      const event = new Event('keydown', { key, ctrlKey: true });
      document.onkeydown(event);

      expect(preventDefaultMock).toHaveBeenCalled();
      expect(stopPropagationMock).toHaveBeenCalled();
    });

    alphabetKeys.forEach((key) => {
      const event = new Event('keydown', { key, metaKey: true });
      document.onkeydown(event);

      expect(preventDefaultMock).toHaveBeenCalled();
      expect(stopPropagationMock).toHaveBeenCalled();
    });
  });

  it('should handle Ctrl + Shift + alphabet keys', async () => {
    await preventShortCuts();

    const alphabetKeys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    alphabetKeys.forEach((key) => {
      const event = new Event('keydown', { key, ctrlKey: true, shiftKey: true });
      document.onkeydown(event);

      expect(preventDefaultMock).toHaveBeenCalled();
      expect(stopPropagationMock).toHaveBeenCalled();
    });
  });
});


describe('updatePersistData', () => {
  const localStorageMock = (() => {
    let store = {};

    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value;
      },
      clear: () => {
        store = {};
      },
      getStore: () => store,
    };
  })();

  global.localStorage = localStorageMock;

  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('should update the existing item in localStorage', () => {
    const key = 'testKey';
    const initialData = { foo: 'bar', baz: 'qux' };
    const updates = { foo: 'updated', newProp: 'newValue' };

    localStorage.setItem(key, JSON.stringify(initialData));

    updatePersistData(key, updates);

    const updatedData = JSON.parse(localStorage.getItem(key));

    expect(updatedData).toEqual({
      foo: 'updated',
      baz: 'qux',
      newProp: 'newValue'
    });
  });

  it('should log a warning if the item does not exist in localStorage', () => {
    const key = 'nonExistentKey';
    const updates = { foo: 'bar' };

    updatePersistData(key, updates);

    expect(console.warn).toHaveBeenCalledWith(`No item found in localStorage with key "${key}"`);
  });

  it('should handle empty updates gracefully', () => {
    const key = 'testKey';
    const initialData = { foo: 'bar' };

    localStorage.setItem(key, JSON.stringify(initialData));

    updatePersistData(key, {});

    const updatedData = JSON.parse(localStorage.getItem(key));

    expect(updatedData).toEqual(initialData);
  });
});

describe('findConfigs', () => {
  it('should return entities that match the provided configs', () => {
    const configs = ['config1', 'config3'];
    const entities = [
      { name: 'config1', data: 'data1' },
      { name: 'config2', data: 'data2' },
      { name: 'config3', data: 'data3' }
    ];

    const result = findConfigs(configs, entities);

    expect(result).toEqual([
      { name: 'config1', data: 'data1' },
      { name: 'config3', data: 'data3' }
    ]);
  });

  it('should return an empty array if no configs match any entities', () => {
    const configs = ['configX', 'configY'];
    const entities = [
      { name: 'config1', data: 'data1' },
      { name: 'config2', data: 'data2' }
    ];

    const result = findConfigs(configs, entities);

    expect(result).toEqual([]);
  });

  it('should handle cases where some configs match and others do not', () => {
    const configs = ['config1', 'configX'];
    const entities = [
      { name: 'config1', data: 'data1' },
      { name: 'config2', data: 'data2' },
      { name: 'config3', data: 'data3' }
    ];

    const result = findConfigs(configs, entities);

    expect(result).toEqual([
      { name: 'config1', data: 'data1' }
    ]);
  });

  it('should return an empty array if entities is empty', () => {
    const configs = ['config1', 'config2'];
    const entities = [];

    const result = findConfigs(configs, entities);

    expect(result).toEqual([]);
  });

  it('should return an empty array if configs is empty', () => {
    const configs = [];
    const entities = [
      { name: 'config1', data: 'data1' },
      { name: 'config2', data: 'data2' }
    ];

    const result = findConfigs(configs, entities);

    expect(result).toEqual([]);
  });
});