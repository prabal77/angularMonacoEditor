import { TestBed } from '@angular/core/testing';

import { EditorConfigService } from './editor-config.service';

describe('EditorConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorConfigService = TestBed.get(EditorConfigService);
    expect(service).toBeTruthy();
  });
});
