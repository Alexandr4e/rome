/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {PartialDiagnostics} from '@romejs/diagnostics';
import {SourceMap} from '@romejs/codec-source-map';
import {AbsoluteFilePath} from '@romejs/path';
import {ResolverOptions} from '../../master/fs/Resolver';
import {Mappings} from '@romejs/codec-source-map';
import {Number1, Number0} from '@romejs/ob1';

export type BundlerConfig = {
  inlineSourceMap: boolean;
  cwd: AbsoluteFilePath;
  resolver: ResolverOptions;
};

export type BundlerMode = 'modern' | 'legacy';

export const BUNDLER_MODES: Array<BundlerMode> = ['modern', 'legacy'];

export type BundlerInMemorySourceMap = Array<{
  map: Mappings;
  firstLine: Number1;
  path: string;
  // TODO: functionMap
}>;

export type BundleRequestResult = {
  cached: boolean;
  diagnostics: PartialDiagnostics;
  content: string;
  map: SourceMap;
  inMemorySourceMap: BundlerInMemorySourceMap;
  assets: Map<string, Buffer>;
};

export type BundleBuddyStats = Array<BundleBuddyGraphNode>;

export type BundleBuddyGraphNode = {
  source: string;
  target: string | undefined;
};

export type BundlerFiles = Map<
  string,
  {
    kind: 'asset' | 'entry' | 'sourcemap' | 'stats' | 'manifest';
    content: string | Buffer;
  }
>;

export type BundleResultBundle = {
  sourceMap: {
    path: string;
    map: SourceMap;
    content: string;
  };
  js: {
    path: string;
    content: string;
  };
};

export type BundleResult = {
  files: BundlerFiles;
  bundles: Array<BundleResultBundle>;
  entry: BundleResultBundle;
};

export type BundlerUnsymbolicatedLocation = {
  lineNumber: undefined | Number1;
  column: undefined | Number0;
};

export type BundlerSymbolicatedStackFrame = {
  file: string;
  lineNumber: Number1;
  column: Number0;
  methodName?: string; // TODO: required
};
