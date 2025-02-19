// Copyright 2023 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Acceptance Test for Blog Post Editor
 */

const userFactory = require(
  '../../puppeteer-testing-utilities/user-factory.js');
const testConstants = require(
  '../../puppeteer-testing-utilities/test-constants.js');

const DEFAULT_SPEC_TIMEOUT = testConstants.DEFAULT_SPEC_TIMEOUT;

describe('Blog Editor', function() {
  let blogPostEditor = null;

  beforeAll(async function() {
    blogPostEditor = await userFactory.createNewBlogPostEditor(
      'blogPostEditor');
  }, DEFAULT_SPEC_TIMEOUT);

  it('should create draft and delete draft blog post',
    async function() {
      await blogPostEditor.navigateToBlogDashboardPage();
      await blogPostEditor.expectNumberOfBlogPostsToBe(0);
      await blogPostEditor.createDraftBlogPostWithTitle('Test-Blog');

      await blogPostEditor.expectNumberOfBlogPostsToBe(1);
      await blogPostEditor.expectDraftBlogPostWithTitleToBePresent('Test-Blog');

      await blogPostEditor.deleteDraftBlogPostWithTitle('Test-Blog');
      await blogPostEditor.expectNumberOfBlogPostsToBe(0);
    }, DEFAULT_SPEC_TIMEOUT);

  afterAll(async function() {
    await userFactory.closeAllBrowsers();
  });
});
