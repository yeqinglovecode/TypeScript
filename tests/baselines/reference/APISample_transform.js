//// [tests/cases/compiler/APISample_transform.ts] ////

//// [APISample_transform.ts]

/*
 * Note: This test is a public API sample. The sample sources can be found 
         at: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-simple-transform-function
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */

declare var process: any;
declare var console: any;
declare var fs: any;
declare var path: any;
declare var os: any;

import ts = require("typescript");

function transform(contents: string, compilerOptions: ts.CompilerOptions = {}) {
    // Sources
    var files = {
        "file.ts": contents,
        "lib.d.ts": fs.readFileSync(ts.getDefaultLibFilePath(compilerOptions)).toString()
    };

    // Generated outputs
    var outputs = [];

    // Create a compilerHost object to allow the compiler to read and write files
    var compilerHost = {
        getSourceFile: (fileName, target) => {
            return files[fileName] !== undefined ?
                ts.createSourceFile(fileName, files[fileName], target) : undefined;
        },
        writeFile: (name, text, writeByteOrderMark) => {
            outputs.push({ name: name, text: text, writeByteOrderMark: writeByteOrderMark });
        },
        getDefaultLibFileName: () => "lib.d.ts",
        useCaseSensitiveFileNames: () => false,
        getCanonicalFileName: (fileName) => fileName,
        getCurrentDirectory: () => "",
        getNewLine: () => "\n"
    };

    // Create a program from inputs
    var program = ts.createProgram(["file.ts"], compilerOptions, compilerHost);

    // Query for early errors
    var errors = ts.getPreEmitDiagnostics(program);
    var emitResult = program.emit();

    errors = errors.concat(emitResult.diagnostics);

    return {
        outputs: outputs,
        errors: errors.map(function (e) {
            return e.file.fileName + "(" + (e.file.getLineAndCharacterOfPosition(e.start).line + 1) + "): "
                                   + ts.flattenDiagnosticMessageText(e.messageText, os.EOL);
        })
    };
}

// Calling our transform function using a simple TypeScript variable declarations, 
// and loading the default library like:
var source = "var x: number  = 'string'";
var result = transform(source);

console.log(JSON.stringify(result));
//// [typescript.d.ts]
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

declare module "typescript" {
    interface Map<T> {
        [index: string]: T;
    }
    interface Span {
        start: number;
        length: number;
    }
    const enum SyntaxKind {
        Unknown = 0,
        EndOfFileToken = 1,
        SingleLineCommentTrivia = 2,
        MultiLineCommentTrivia = 3,
        NewLineTrivia = 4,
        WhitespaceTrivia = 5,
        ConflictMarkerTrivia = 6,
        NumericLiteral = 7,
        StringLiteral = 8,
        RegularExpressionLiteral = 9,
        NoSubstitutionTemplateLiteral = 10,
        TemplateHead = 11,
        TemplateMiddle = 12,
        TemplateTail = 13,
        OpenBraceToken = 14,
        CloseBraceToken = 15,
        OpenParenToken = 16,
        CloseParenToken = 17,
        OpenBracketToken = 18,
        CloseBracketToken = 19,
        DotToken = 20,
        DotDotDotToken = 21,
        SemicolonToken = 22,
        CommaToken = 23,
        LessThanToken = 24,
        GreaterThanToken = 25,
        LessThanEqualsToken = 26,
        GreaterThanEqualsToken = 27,
        EqualsEqualsToken = 28,
        ExclamationEqualsToken = 29,
        EqualsEqualsEqualsToken = 30,
        ExclamationEqualsEqualsToken = 31,
        EqualsGreaterThanToken = 32,
        PlusToken = 33,
        MinusToken = 34,
        AsteriskToken = 35,
        SlashToken = 36,
        PercentToken = 37,
        PlusPlusToken = 38,
        MinusMinusToken = 39,
        LessThanLessThanToken = 40,
        GreaterThanGreaterThanToken = 41,
        GreaterThanGreaterThanGreaterThanToken = 42,
        AmpersandToken = 43,
        BarToken = 44,
        CaretToken = 45,
        ExclamationToken = 46,
        TildeToken = 47,
        AmpersandAmpersandToken = 48,
        BarBarToken = 49,
        QuestionToken = 50,
        ColonToken = 51,
        EqualsToken = 52,
        PlusEqualsToken = 53,
        MinusEqualsToken = 54,
        AsteriskEqualsToken = 55,
        SlashEqualsToken = 56,
        PercentEqualsToken = 57,
        LessThanLessThanEqualsToken = 58,
        GreaterThanGreaterThanEqualsToken = 59,
        GreaterThanGreaterThanGreaterThanEqualsToken = 60,
        AmpersandEqualsToken = 61,
        BarEqualsToken = 62,
        CaretEqualsToken = 63,
        Identifier = 64,
        BreakKeyword = 65,
        CaseKeyword = 66,
        CatchKeyword = 67,
        ClassKeyword = 68,
        ConstKeyword = 69,
        ContinueKeyword = 70,
        DebuggerKeyword = 71,
        DefaultKeyword = 72,
        DeleteKeyword = 73,
        DoKeyword = 74,
        ElseKeyword = 75,
        EnumKeyword = 76,
        ExportKeyword = 77,
        ExtendsKeyword = 78,
        FalseKeyword = 79,
        FinallyKeyword = 80,
        ForKeyword = 81,
        FunctionKeyword = 82,
        IfKeyword = 83,
        ImportKeyword = 84,
        InKeyword = 85,
        InstanceOfKeyword = 86,
        NewKeyword = 87,
        NullKeyword = 88,
        ReturnKeyword = 89,
        SuperKeyword = 90,
        SwitchKeyword = 91,
        ThisKeyword = 92,
        ThrowKeyword = 93,
        TrueKeyword = 94,
        TryKeyword = 95,
        TypeOfKeyword = 96,
        VarKeyword = 97,
        VoidKeyword = 98,
        WhileKeyword = 99,
        WithKeyword = 100,
        AsKeyword = 101,
        ImplementsKeyword = 102,
        InterfaceKeyword = 103,
        LetKeyword = 104,
        PackageKeyword = 105,
        PrivateKeyword = 106,
        ProtectedKeyword = 107,
        PublicKeyword = 108,
        StaticKeyword = 109,
        YieldKeyword = 110,
        AnyKeyword = 111,
        BooleanKeyword = 112,
        ConstructorKeyword = 113,
        DeclareKeyword = 114,
        GetKeyword = 115,
        ModuleKeyword = 116,
        RequireKeyword = 117,
        NumberKeyword = 118,
        SetKeyword = 119,
        StringKeyword = 120,
        SymbolKeyword = 121,
        TypeKeyword = 122,
        FromKeyword = 123,
        OfKeyword = 124,
        QualifiedName = 125,
        ComputedPropertyName = 126,
        TypeParameter = 127,
        Parameter = 128,
        PropertySignature = 129,
        PropertyDeclaration = 130,
        MethodSignature = 131,
        MethodDeclaration = 132,
        Constructor = 133,
        GetAccessor = 134,
        SetAccessor = 135,
        CallSignature = 136,
        ConstructSignature = 137,
        IndexSignature = 138,
        TypeReference = 139,
        FunctionType = 140,
        ConstructorType = 141,
        TypeQuery = 142,
        TypeLiteral = 143,
        ArrayType = 144,
        TupleType = 145,
        UnionType = 146,
        ParenthesizedType = 147,
        ObjectBindingPattern = 148,
        ArrayBindingPattern = 149,
        BindingElement = 150,
        ArrayLiteralExpression = 151,
        ObjectLiteralExpression = 152,
        PropertyAccessExpression = 153,
        ElementAccessExpression = 154,
        CallExpression = 155,
        NewExpression = 156,
        TaggedTemplateExpression = 157,
        TypeAssertionExpression = 158,
        ParenthesizedExpression = 159,
        FunctionExpression = 160,
        ArrowFunction = 161,
        DeleteExpression = 162,
        TypeOfExpression = 163,
        VoidExpression = 164,
        PrefixUnaryExpression = 165,
        PostfixUnaryExpression = 166,
        BinaryExpression = 167,
        ConditionalExpression = 168,
        TemplateExpression = 169,
        YieldExpression = 170,
        SpreadElementExpression = 171,
        OmittedExpression = 172,
        TemplateSpan = 173,
        Block = 174,
        VariableStatement = 175,
        EmptyStatement = 176,
        ExpressionStatement = 177,
        IfStatement = 178,
        DoStatement = 179,
        WhileStatement = 180,
        ForStatement = 181,
        ForInStatement = 182,
        ForOfStatement = 183,
        ContinueStatement = 184,
        BreakStatement = 185,
        ReturnStatement = 186,
        WithStatement = 187,
        SwitchStatement = 188,
        LabeledStatement = 189,
        ThrowStatement = 190,
        TryStatement = 191,
        DebuggerStatement = 192,
        VariableDeclaration = 193,
        VariableDeclarationList = 194,
        FunctionDeclaration = 195,
        ClassDeclaration = 196,
        InterfaceDeclaration = 197,
        TypeAliasDeclaration = 198,
        EnumDeclaration = 199,
        ModuleDeclaration = 200,
        ModuleBlock = 201,
        CaseBlock = 202,
        ImportEqualsDeclaration = 203,
        ImportDeclaration = 204,
        ImportClause = 205,
        NamespaceImport = 206,
        NamedImports = 207,
        ImportSpecifier = 208,
        ExportAssignment = 209,
        ExportDeclaration = 210,
        NamedExports = 211,
        ExportSpecifier = 212,
        ExternalModuleReference = 213,
        CaseClause = 214,
        DefaultClause = 215,
        HeritageClause = 216,
        CatchClause = 217,
        PropertyAssignment = 218,
        ShorthandPropertyAssignment = 219,
        EnumMember = 220,
        SourceFile = 221,
        SyntaxList = 222,
        Count = 223,
        FirstAssignment = 52,
        LastAssignment = 63,
        FirstReservedWord = 65,
        LastReservedWord = 100,
        FirstKeyword = 65,
        LastKeyword = 124,
        FirstFutureReservedWord = 102,
        LastFutureReservedWord = 110,
        FirstTypeNode = 139,
        LastTypeNode = 147,
        FirstPunctuation = 14,
        LastPunctuation = 63,
        FirstToken = 0,
        LastToken = 124,
        FirstTriviaToken = 2,
        LastTriviaToken = 6,
        FirstLiteralToken = 7,
        LastLiteralToken = 10,
        FirstTemplateToken = 10,
        LastTemplateToken = 13,
        FirstBinaryOperator = 24,
        LastBinaryOperator = 63,
        FirstNode = 125,
    }
    const enum NodeFlags {
        Export = 1,
        Ambient = 2,
        Public = 16,
        Private = 32,
        Protected = 64,
        Static = 128,
        Default = 256,
        MultiLine = 512,
        Synthetic = 1024,
        DeclarationFile = 2048,
        Let = 4096,
        Const = 8192,
        OctalLiteral = 16384,
        Modifier = 499,
        AccessibilityModifier = 112,
        BlockScoped = 12288,
    }
    const enum ParserContextFlags {
        StrictMode = 1,
        DisallowIn = 2,
        Yield = 4,
        GeneratorParameter = 8,
        ThisNodeHasError = 16,
        ParserGeneratedFlags = 31,
        ThisNodeOrAnySubNodesHasError = 32,
        HasAggregatedChildData = 64,
    }
    const enum RelationComparisonResult {
        Succeeded = 1,
        Failed = 2,
        FailedAndReported = 3,
    }
    interface Node extends Span {
        kind: SyntaxKind;
        flags: NodeFlags;
        parserContextFlags?: ParserContextFlags;
        modifiers?: ModifiersArray;
        id?: number;
        parent?: Node;
        symbol?: Symbol;
        locals?: SymbolTable;
        nextContainer?: Node;
        localSymbol?: Symbol;
    }
    interface NodeArray<T> extends Array<T> {
        start: number;
        hasTrailingComma?: boolean;
        closeTokenIsMissing?: boolean;
    }
    interface ModifiersArray extends NodeArray<Node> {
        flags: number;
    }
    interface Identifier extends PrimaryExpression {
        text: string;
    }
    interface QualifiedName extends Node {
        left: EntityName;
        right: Identifier;
    }
    type EntityName = Identifier | QualifiedName;
    type DeclarationName = Identifier | LiteralExpression | ComputedPropertyName | BindingPattern;
    interface Declaration extends Node {
        _declarationBrand: any;
        name?: DeclarationName;
    }
    interface ComputedPropertyName extends Node {
        expression: Expression;
    }
    interface TypeParameterDeclaration extends Declaration {
        name: Identifier;
        constraint?: TypeNode;
        expression?: Expression;
    }
    interface SignatureDeclaration extends Declaration {
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        parameters: NodeArray<ParameterDeclaration>;
        type?: TypeNode;
    }
    interface VariableDeclaration extends Declaration {
        parent?: VariableDeclarationList;
        name: Identifier | BindingPattern;
        type?: TypeNode;
        initializer?: Expression;
    }
    interface VariableDeclarationList extends Node {
        declarations: NodeArray<VariableDeclaration>;
    }
    interface ParameterDeclaration extends Declaration {
        dotDotDotToken?: Node;
        name: Identifier | BindingPattern;
        questionToken?: Node;
        type?: TypeNode;
        initializer?: Expression;
    }
    interface BindingElement extends Declaration {
        propertyName?: Identifier;
        dotDotDotToken?: Node;
        name: Identifier | BindingPattern;
        initializer?: Expression;
    }
    interface PropertyDeclaration extends Declaration, ClassElement {
        name: DeclarationName;
        questionToken?: Node;
        type?: TypeNode;
        initializer?: Expression;
    }
    interface ObjectLiteralElement extends Declaration {
        _objectLiteralBrandBrand: any;
    }
    interface PropertyAssignment extends ObjectLiteralElement {
        _propertyAssignmentBrand: any;
        name: DeclarationName;
        questionToken?: Node;
        initializer: Expression;
    }
    interface ShorthandPropertyAssignment extends ObjectLiteralElement {
        name: Identifier;
        questionToken?: Node;
    }
    interface VariableLikeDeclaration extends Declaration {
        propertyName?: Identifier;
        dotDotDotToken?: Node;
        name: DeclarationName;
        questionToken?: Node;
        type?: TypeNode;
        initializer?: Expression;
    }
    interface BindingPattern extends Node {
        elements: NodeArray<BindingElement>;
    }
    /**
     * Several node kinds share function-like features such as a signature,
     * a name, and a body. These nodes should extend FunctionLikeDeclaration.
     * Examples:
     *  FunctionDeclaration
     *  MethodDeclaration
     *  AccessorDeclaration
     */
    interface FunctionLikeDeclaration extends SignatureDeclaration {
        _functionLikeDeclarationBrand: any;
        asteriskToken?: Node;
        questionToken?: Node;
        body?: Block | Expression;
    }
    interface FunctionDeclaration extends FunctionLikeDeclaration, Statement {
        name?: Identifier;
        body?: Block;
    }
    interface MethodDeclaration extends FunctionLikeDeclaration, ClassElement, ObjectLiteralElement {
        body?: Block;
    }
    interface ConstructorDeclaration extends FunctionLikeDeclaration, ClassElement {
        body?: Block;
    }
    interface AccessorDeclaration extends FunctionLikeDeclaration, ClassElement, ObjectLiteralElement {
        _accessorDeclarationBrand: any;
        body: Block;
    }
    interface IndexSignatureDeclaration extends SignatureDeclaration, ClassElement {
        _indexSignatureDeclarationBrand: any;
    }
    interface TypeNode extends Node {
        _typeNodeBrand: any;
    }
    interface FunctionOrConstructorTypeNode extends TypeNode, SignatureDeclaration {
        _functionOrConstructorTypeNodeBrand: any;
    }
    interface TypeReferenceNode extends TypeNode {
        typeName: EntityName;
        typeArguments?: NodeArray<TypeNode>;
    }
    interface TypeQueryNode extends TypeNode {
        exprName: EntityName;
    }
    interface TypeLiteralNode extends TypeNode, Declaration {
        members: NodeArray<Node>;
    }
    interface ArrayTypeNode extends TypeNode {
        elementType: TypeNode;
    }
    interface TupleTypeNode extends TypeNode {
        elementTypes: NodeArray<TypeNode>;
    }
    interface UnionTypeNode extends TypeNode {
        types: NodeArray<TypeNode>;
    }
    interface ParenthesizedTypeNode extends TypeNode {
        type: TypeNode;
    }
    interface StringLiteralTypeNode extends LiteralExpression, TypeNode {
    }
    interface Expression extends Node {
        _expressionBrand: any;
        contextualType?: Type;
    }
    interface UnaryExpression extends Expression {
        _unaryExpressionBrand: any;
    }
    interface PrefixUnaryExpression extends UnaryExpression {
        operator: SyntaxKind;
        operand: UnaryExpression;
    }
    interface PostfixUnaryExpression extends PostfixExpression {
        operand: LeftHandSideExpression;
        operator: SyntaxKind;
    }
    interface PostfixExpression extends UnaryExpression {
        _postfixExpressionBrand: any;
    }
    interface LeftHandSideExpression extends PostfixExpression {
        _leftHandSideExpressionBrand: any;
    }
    interface MemberExpression extends LeftHandSideExpression {
        _memberExpressionBrand: any;
    }
    interface PrimaryExpression extends MemberExpression {
        _primaryExpressionBrand: any;
    }
    interface DeleteExpression extends UnaryExpression {
        expression: UnaryExpression;
    }
    interface TypeOfExpression extends UnaryExpression {
        expression: UnaryExpression;
    }
    interface VoidExpression extends UnaryExpression {
        expression: UnaryExpression;
    }
    interface YieldExpression extends Expression {
        asteriskToken?: Node;
        expression: Expression;
    }
    interface BinaryExpression extends Expression {
        left: Expression;
        operatorToken: Node;
        right: Expression;
    }
    interface ConditionalExpression extends Expression {
        condition: Expression;
        questionToken: Node;
        whenTrue: Expression;
        colonToken: Node;
        whenFalse: Expression;
    }
    interface FunctionExpression extends PrimaryExpression, FunctionLikeDeclaration {
        name?: Identifier;
        body: Block | Expression;
    }
    interface ArrowFunction extends Expression, FunctionLikeDeclaration {
        equalsGreaterThanToken: Node;
    }
    interface LiteralExpression extends PrimaryExpression {
        text: string;
        isUnterminated?: boolean;
        hasExtendedUnicodeEscape?: boolean;
    }
    interface StringLiteralExpression extends LiteralExpression {
        _stringLiteralExpressionBrand: any;
    }
    interface TemplateExpression extends PrimaryExpression {
        head: LiteralExpression;
        templateSpans: NodeArray<TemplateSpan>;
    }
    interface TemplateSpan extends Node {
        expression: Expression;
        literal: LiteralExpression;
    }
    interface ParenthesizedExpression extends PrimaryExpression {
        expression: Expression;
    }
    interface ArrayLiteralExpression extends PrimaryExpression {
        elements: NodeArray<Expression>;
    }
    interface SpreadElementExpression extends Expression {
        expression: Expression;
    }
    interface ObjectLiteralExpression extends PrimaryExpression, Declaration {
        properties: NodeArray<ObjectLiteralElement>;
    }
    interface PropertyAccessExpression extends MemberExpression {
        expression: LeftHandSideExpression;
        dotToken: Node;
        name: Identifier;
    }
    interface ElementAccessExpression extends MemberExpression {
        expression: LeftHandSideExpression;
        argumentExpression?: Expression;
    }
    interface CallExpression extends LeftHandSideExpression {
        expression: LeftHandSideExpression;
        typeArguments?: NodeArray<TypeNode>;
        arguments: NodeArray<Expression>;
    }
    interface NewExpression extends CallExpression, PrimaryExpression {
    }
    interface TaggedTemplateExpression extends MemberExpression {
        tag: LeftHandSideExpression;
        template: LiteralExpression | TemplateExpression;
    }
    type CallLikeExpression = CallExpression | NewExpression | TaggedTemplateExpression;
    interface TypeAssertion extends UnaryExpression {
        type: TypeNode;
        expression: UnaryExpression;
    }
    interface Statement extends Node, ModuleElement {
        _statementBrand: any;
    }
    interface Block extends Statement {
        statements: NodeArray<Statement>;
    }
    interface VariableStatement extends Statement {
        declarationList: VariableDeclarationList;
    }
    interface ExpressionStatement extends Statement {
        expression: Expression;
    }
    interface IfStatement extends Statement {
        expression: Expression;
        thenStatement: Statement;
        elseStatement?: Statement;
    }
    interface IterationStatement extends Statement {
        statement: Statement;
    }
    interface DoStatement extends IterationStatement {
        expression: Expression;
    }
    interface WhileStatement extends IterationStatement {
        expression: Expression;
    }
    interface ForStatement extends IterationStatement {
        initializer?: VariableDeclarationList | Expression;
        condition?: Expression;
        iterator?: Expression;
    }
    interface ForInStatement extends IterationStatement {
        initializer: VariableDeclarationList | Expression;
        expression: Expression;
    }
    interface ForOfStatement extends IterationStatement {
        initializer: VariableDeclarationList | Expression;
        expression: Expression;
    }
    interface BreakOrContinueStatement extends Statement {
        label?: Identifier;
    }
    interface ReturnStatement extends Statement {
        expression?: Expression;
    }
    interface WithStatement extends Statement {
        expression: Expression;
        statement: Statement;
    }
    interface SwitchStatement extends Statement {
        expression: Expression;
        caseBlock: CaseBlock;
    }
    interface CaseBlock extends Node {
        clauses: NodeArray<CaseOrDefaultClause>;
    }
    interface CaseClause extends Node {
        expression?: Expression;
        statements: NodeArray<Statement>;
    }
    interface DefaultClause extends Node {
        statements: NodeArray<Statement>;
    }
    type CaseOrDefaultClause = CaseClause | DefaultClause;
    interface LabeledStatement extends Statement {
        label: Identifier;
        statement: Statement;
    }
    interface ThrowStatement extends Statement {
        expression: Expression;
    }
    interface TryStatement extends Statement {
        tryBlock: Block;
        catchClause?: CatchClause;
        finallyBlock?: Block;
    }
    interface CatchClause extends Node {
        variableDeclaration: VariableDeclaration;
        block: Block;
    }
    interface ModuleElement extends Node {
        _moduleElementBrand: any;
    }
    interface ClassDeclaration extends Declaration, ModuleElement {
        name?: Identifier;
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        heritageClauses?: NodeArray<HeritageClause>;
        members: NodeArray<ClassElement>;
    }
    interface ClassElement extends Declaration {
        _classElementBrand: any;
    }
    interface InterfaceDeclaration extends Declaration, ModuleElement {
        name: Identifier;
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        heritageClauses?: NodeArray<HeritageClause>;
        members: NodeArray<Declaration>;
    }
    interface HeritageClause extends Node {
        token: SyntaxKind;
        types?: NodeArray<TypeReferenceNode>;
    }
    interface TypeAliasDeclaration extends Declaration, ModuleElement {
        name: Identifier;
        type: TypeNode;
    }
    interface EnumMember extends Declaration {
        name: DeclarationName;
        initializer?: Expression;
    }
    interface EnumDeclaration extends Declaration, ModuleElement {
        name: Identifier;
        members: NodeArray<EnumMember>;
    }
    interface ModuleDeclaration extends Declaration, ModuleElement {
        name: Identifier | LiteralExpression;
        body: ModuleBlock | ModuleDeclaration;
    }
    interface ModuleBlock extends Node, ModuleElement {
        statements: NodeArray<ModuleElement>;
    }
    interface ImportEqualsDeclaration extends Declaration, ModuleElement {
        name: Identifier;
        moduleReference: EntityName | ExternalModuleReference;
    }
    interface ExternalModuleReference extends Node {
        expression?: Expression;
    }
    interface ImportDeclaration extends Statement, ModuleElement {
        importClause?: ImportClause;
        moduleSpecifier: Expression;
    }
    interface ImportClause extends Declaration {
        name?: Identifier;
        namedBindings?: NamespaceImport | NamedImports;
    }
    interface NamespaceImport extends Declaration {
        name: Identifier;
    }
    interface ExportDeclaration extends Declaration, ModuleElement {
        exportClause?: NamedExports;
        moduleSpecifier?: Expression;
    }
    interface NamedImportsOrExports extends Node {
        elements: NodeArray<ImportOrExportSpecifier>;
    }
    type NamedImports = NamedImportsOrExports;
    type NamedExports = NamedImportsOrExports;
    interface ImportOrExportSpecifier extends Declaration {
        propertyName?: Identifier;
        name: Identifier;
    }
    type ImportSpecifier = ImportOrExportSpecifier;
    type ExportSpecifier = ImportOrExportSpecifier;
    interface ExportAssignment extends Declaration, ModuleElement {
        isExportEquals?: boolean;
        expression?: Expression;
        type?: TypeNode;
    }
    interface FileReference extends Span {
        fileName: string;
    }
    interface CommentSpan extends Span {
        hasTrailingNewLine?: boolean;
    }
    interface SourceFile extends Declaration {
        statements: NodeArray<ModuleElement>;
        endOfFileToken: Node;
        fileName: string;
        text: string;
        amdDependencies: {
            path: string;
            name: string;
        }[];
        amdModuleName: string;
        referencedFiles: FileReference[];
        hasNoDefaultLib: boolean;
        externalModuleIndicator: Node;
        languageVersion: ScriptTarget;
        identifiers: Map<string>;
    }
    interface ScriptReferenceHost {
        getCompilerOptions(): CompilerOptions;
        getSourceFile(fileName: string): SourceFile;
        getCurrentDirectory(): string;
    }
    interface WriteFileCallback {
        (fileName: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void): void;
    }
    interface Program extends ScriptReferenceHost {
        getSourceFiles(): SourceFile[];
        /**
         * Emits the JavaScript and declaration files.  If targetSourceFile is not specified, then
         * the JavaScript and declaration files will be produced for all the files in this program.
         * If targetSourceFile is specified, then only the JavaScript and declaration for that
         * specific file will be generated.
         *
         * If writeFile is not specified then the writeFile callback from the compiler host will be
         * used for writing the JavaScript and declaration files.  Otherwise, the writeFile parameter
         * will be invoked when writing the JavaScript and declaration files.
         */
        emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback): EmitResult;
        getSyntacticDiagnostics(sourceFile?: SourceFile): Diagnostic[];
        getGlobalDiagnostics(): Diagnostic[];
        getSemanticDiagnostics(sourceFile?: SourceFile): Diagnostic[];
        getDeclarationDiagnostics(sourceFile?: SourceFile): Diagnostic[];
        getTypeChecker(): TypeChecker;
        getCommonSourceDirectory(): string;
    }
    interface SourceMapSpan {
        emittedLine: number;
        emittedColumn: number;
        sourceLine: number;
        sourceColumn: number;
        nameIndex?: number;
        sourceIndex: number;
    }
    interface SourceMapData {
        sourceMapFilePath: string;
        jsSourceMappingURL: string;
        sourceMapFile: string;
        sourceMapSourceRoot: string;
        sourceMapSources: string[];
        inputSourceFileNames: string[];
        sourceMapNames?: string[];
        sourceMapMappings: string;
        sourceMapDecodedMappings: SourceMapSpan[];
    }
    enum ExitStatus {
        Success = 0,
        DiagnosticsPresent_OutputsSkipped = 1,
        DiagnosticsPresent_OutputsGenerated = 2,
    }
    interface EmitResult {
        emitSkipped: boolean;
        diagnostics: Diagnostic[];
        sourceMaps: SourceMapData[];
    }
    interface TypeCheckerHost {
        getCompilerOptions(): CompilerOptions;
        getSourceFiles(): SourceFile[];
        getSourceFile(fileName: string): SourceFile;
    }
    interface TypeChecker {
        getTypeOfSymbolAtLocation(symbol: Symbol, node: Node): Type;
        getDeclaredTypeOfSymbol(symbol: Symbol): Type;
        getPropertiesOfType(type: Type): Symbol[];
        getPropertyOfType(type: Type, propertyName: string): Symbol;
        getSignaturesOfType(type: Type, kind: SignatureKind): Signature[];
        getIndexTypeOfType(type: Type, kind: IndexKind): Type;
        getReturnTypeOfSignature(signature: Signature): Type;
        getSymbolsInScope(location: Node, meaning: SymbolFlags): Symbol[];
        getSymbolAtLocation(node: Node): Symbol;
        getShorthandAssignmentValueSymbol(location: Node): Symbol;
        getTypeAtLocation(node: Node): Type;
        typeToString(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
        symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags): string;
        getSymbolDisplayBuilder(): SymbolDisplayBuilder;
        getFullyQualifiedName(symbol: Symbol): string;
        getAugmentedPropertiesOfType(type: Type): Symbol[];
        getRootSymbols(symbol: Symbol): Symbol[];
        getContextualType(node: Expression): Type;
        getResolvedSignature(node: CallLikeExpression, candidatesOutArray?: Signature[]): Signature;
        getSignatureFromDeclaration(declaration: SignatureDeclaration): Signature;
        isImplementationOfOverload(node: FunctionLikeDeclaration): boolean;
        isUndefinedSymbol(symbol: Symbol): boolean;
        isArgumentsSymbol(symbol: Symbol): boolean;
        getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): number;
        isValidPropertyAccess(node: PropertyAccessExpression | QualifiedName, propertyName: string): boolean;
        getAliasedSymbol(symbol: Symbol): Symbol;
        getExportsOfExternalModule(node: ImportDeclaration): Symbol[];
    }
    interface SymbolDisplayBuilder {
        buildTypeDisplay(type: Type, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildSymbolDisplay(symbol: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): void;
        buildSignatureDisplay(signatures: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildParameterDisplay(parameter: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildTypeParameterDisplay(tp: TypeParameter, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildTypeParameterDisplayFromSymbol(symbol: Symbol, writer: SymbolWriter, enclosingDeclaraiton?: Node, flags?: TypeFormatFlags): void;
        buildDisplayForParametersAndDelimiters(parameters: Symbol[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildDisplayForTypeParametersAndDelimiters(typeParameters: TypeParameter[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildReturnTypeDisplay(signature: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
    }
    interface SymbolWriter {
        writeKeyword(text: string): void;
        writeOperator(text: string): void;
        writePunctuation(text: string): void;
        writeSpace(text: string): void;
        writeStringLiteral(text: string): void;
        writeParameter(text: string): void;
        writeSymbol(text: string, symbol: Symbol): void;
        writeLine(): void;
        increaseIndent(): void;
        decreaseIndent(): void;
        clear(): void;
        trackSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags): void;
    }
    const enum TypeFormatFlags {
        None = 0,
        WriteArrayAsGenericType = 1,
        UseTypeOfFunction = 2,
        NoTruncation = 4,
        WriteArrowStyleSignature = 8,
        WriteOwnNameForAnyLike = 16,
        WriteTypeArgumentsOfSignature = 32,
        InElementType = 64,
        UseFullyQualifiedType = 128,
    }
    const enum SymbolFormatFlags {
        None = 0,
        WriteTypeParametersOrArguments = 1,
        UseOnlyExternalAliasing = 2,
    }
    const enum SymbolAccessibility {
        Accessible = 0,
        NotAccessible = 1,
        CannotBeNamed = 2,
    }
    type AnyImportSyntax = ImportDeclaration | ImportEqualsDeclaration;
    interface SymbolVisibilityResult {
        accessibility: SymbolAccessibility;
        aliasesToMakeVisible?: AnyImportSyntax[];
        errorSymbolName?: string;
        errorNode?: Node;
    }
    interface SymbolAccessiblityResult extends SymbolVisibilityResult {
        errorModuleName?: string;
    }
    interface EmitResolver {
        getGeneratedNameForNode(node: Node): string;
        getExpressionNameSubstitution(node: Identifier): string;
        hasExportDefaultValue(node: SourceFile): boolean;
        isReferencedAliasDeclaration(node: Node): boolean;
        isTopLevelValueImportEqualsWithEntityName(node: ImportEqualsDeclaration): boolean;
        getNodeCheckFlags(node: Node): NodeCheckFlags;
        isDeclarationVisible(node: Declaration): boolean;
        collectLinkedAliases(node: Identifier): Node[];
        isImplementationOfOverload(node: FunctionLikeDeclaration): boolean;
        writeTypeOfDeclaration(declaration: AccessorDeclaration | VariableLikeDeclaration, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter): void;
        writeReturnTypeOfSignatureDeclaration(signatureDeclaration: SignatureDeclaration, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter): void;
        writeTypeOfExpression(expr: Expression, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter): void;
        isSymbolAccessible(symbol: Symbol, enclosingDeclaration: Node, meaning: SymbolFlags): SymbolAccessiblityResult;
        isEntityNameVisible(entityName: EntityName, enclosingDeclaration: Node): SymbolVisibilityResult;
        getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): number;
        isUnknownIdentifier(location: Node, name: string): boolean;
        getBlockScopedVariableId(node: Identifier): number;
    }
    const enum SymbolFlags {
        FunctionScopedVariable = 1,
        BlockScopedVariable = 2,
        Property = 4,
        EnumMember = 8,
        Function = 16,
        Class = 32,
        Interface = 64,
        ConstEnum = 128,
        RegularEnum = 256,
        ValueModule = 512,
        NamespaceModule = 1024,
        TypeLiteral = 2048,
        ObjectLiteral = 4096,
        Method = 8192,
        Constructor = 16384,
        GetAccessor = 32768,
        SetAccessor = 65536,
        Signature = 131072,
        TypeParameter = 262144,
        TypeAlias = 524288,
        ExportValue = 1048576,
        ExportType = 2097152,
        ExportNamespace = 4194304,
        Alias = 8388608,
        Instantiated = 16777216,
        Merged = 33554432,
        Transient = 67108864,
        Prototype = 134217728,
        UnionProperty = 268435456,
        Optional = 536870912,
        ExportStar = 1073741824,
        Enum = 384,
        Variable = 3,
        Value = 107455,
        Type = 793056,
        Namespace = 1536,
        Module = 1536,
        Accessor = 98304,
        FunctionScopedVariableExcludes = 107454,
        BlockScopedVariableExcludes = 107455,
        ParameterExcludes = 107455,
        PropertyExcludes = 107455,
        EnumMemberExcludes = 107455,
        FunctionExcludes = 106927,
        ClassExcludes = 899583,
        InterfaceExcludes = 792992,
        RegularEnumExcludes = 899327,
        ConstEnumExcludes = 899967,
        ValueModuleExcludes = 106639,
        NamespaceModuleExcludes = 0,
        MethodExcludes = 99263,
        GetAccessorExcludes = 41919,
        SetAccessorExcludes = 74687,
        TypeParameterExcludes = 530912,
        TypeAliasExcludes = 793056,
        AliasExcludes = 8388608,
        ModuleMember = 8914931,
        ExportHasLocal = 944,
        HasLocals = 255504,
        HasExports = 1952,
        HasMembers = 6240,
        IsContainer = 262128,
        PropertyOrAccessor = 98308,
        Export = 7340032,
    }
    interface Symbol {
        flags: SymbolFlags;
        name: string;
        id?: number;
        mergeId?: number;
        declarations?: Declaration[];
        parent?: Symbol;
        members?: SymbolTable;
        exports?: SymbolTable;
        exportSymbol?: Symbol;
        valueDeclaration?: Declaration;
        constEnumOnlyModule?: boolean;
    }
    interface SymbolLinks {
        target?: Symbol;
        type?: Type;
        declaredType?: Type;
        mapper?: TypeMapper;
        referenced?: boolean;
        unionType?: UnionType;
        resolvedExports?: SymbolTable;
        exportsChecked?: boolean;
    }
    interface TransientSymbol extends Symbol, SymbolLinks {
    }
    interface SymbolTable {
        [index: string]: Symbol;
    }
    const enum NodeCheckFlags {
        TypeChecked = 1,
        LexicalThis = 2,
        CaptureThis = 4,
        EmitExtends = 8,
        SuperInstance = 16,
        SuperStatic = 32,
        ContextChecked = 64,
        EnumValuesComputed = 128,
        BlockScopedBindingInLoop = 256,
    }
    interface NodeLinks {
        resolvedType?: Type;
        resolvedSignature?: Signature;
        resolvedSymbol?: Symbol;
        flags?: NodeCheckFlags;
        enumMemberValue?: number;
        isIllegalTypeReferenceInConstraint?: boolean;
        isVisible?: boolean;
        generatedName?: string;
        generatedNames?: Map<string>;
        assignmentChecks?: Map<boolean>;
        hasReportedStatementInAmbientContext?: boolean;
        importOnRightSide?: Symbol;
    }
    const enum TypeFlags {
        Any = 1,
        String = 2,
        Number = 4,
        Boolean = 8,
        Void = 16,
        Undefined = 32,
        Null = 64,
        Enum = 128,
        StringLiteral = 256,
        TypeParameter = 512,
        Class = 1024,
        Interface = 2048,
        Reference = 4096,
        Tuple = 8192,
        Union = 16384,
        Anonymous = 32768,
        FromSignature = 65536,
        ObjectLiteral = 131072,
        ContainsUndefinedOrNull = 262144,
        ContainsObjectLiteral = 524288,
        ESSymbol = 1048576,
        Intrinsic = 1048703,
        Primitive = 1049086,
        StringLike = 258,
        NumberLike = 132,
        ObjectType = 48128,
        RequiresWidening = 786432,
    }
    interface Type {
        flags: TypeFlags;
        id: number;
        symbol?: Symbol;
    }
    interface IntrinsicType extends Type {
        intrinsicName: string;
    }
    interface StringLiteralType extends Type {
        text: string;
    }
    interface ObjectType extends Type {
    }
    interface InterfaceType extends ObjectType {
        typeParameters: TypeParameter[];
        baseTypes: ObjectType[];
        declaredProperties: Symbol[];
        declaredCallSignatures: Signature[];
        declaredConstructSignatures: Signature[];
        declaredStringIndexType: Type;
        declaredNumberIndexType: Type;
    }
    interface TypeReference extends ObjectType {
        target: GenericType;
        typeArguments: Type[];
    }
    interface GenericType extends InterfaceType, TypeReference {
        instantiations: Map<TypeReference>;
    }
    interface TupleType extends ObjectType {
        elementTypes: Type[];
        baseArrayType: TypeReference;
    }
    interface UnionType extends Type {
        types: Type[];
        resolvedProperties: SymbolTable;
    }
    interface ResolvedType extends ObjectType, UnionType {
        members: SymbolTable;
        properties: Symbol[];
        callSignatures: Signature[];
        constructSignatures: Signature[];
        stringIndexType: Type;
        numberIndexType: Type;
    }
    interface TypeParameter extends Type {
        constraint: Type;
        target?: TypeParameter;
        mapper?: TypeMapper;
    }
    const enum SignatureKind {
        Call = 0,
        Construct = 1,
    }
    interface Signature {
        declaration: SignatureDeclaration;
        typeParameters: TypeParameter[];
        parameters: Symbol[];
        resolvedReturnType: Type;
        minArgumentCount: number;
        hasRestParameter: boolean;
        hasStringLiterals: boolean;
        target?: Signature;
        mapper?: TypeMapper;
        unionSignatures?: Signature[];
        erasedSignatureCache?: Signature;
        isolatedSignatureType?: ObjectType;
    }
    const enum IndexKind {
        String = 0,
        Number = 1,
    }
    interface TypeMapper {
        (t: Type): Type;
    }
    interface DiagnosticMessage {
        key: string;
        category: DiagnosticCategory;
        code: number;
    }
    interface DiagnosticMessageChain {
        messageText: string;
        category: DiagnosticCategory;
        code: number;
        next?: DiagnosticMessageChain;
    }
    interface Diagnostic {
        file: SourceFile;
        start: number;
        length: number;
        messageText: string | DiagnosticMessageChain;
        category: DiagnosticCategory;
        code: number;
    }
    enum DiagnosticCategory {
        Warning = 0,
        Error = 1,
        Message = 2,
    }
    interface CompilerOptions {
        allowNonTsExtensions?: boolean;
        charset?: string;
        codepage?: number;
        declaration?: boolean;
        diagnostics?: boolean;
        emitBOM?: boolean;
        help?: boolean;
        listFiles?: boolean;
        locale?: string;
        mapRoot?: string;
        module?: ModuleKind;
        noEmit?: boolean;
        noEmitOnError?: boolean;
        noErrorTruncation?: boolean;
        noImplicitAny?: boolean;
        noLib?: boolean;
        noLibCheck?: boolean;
        noResolve?: boolean;
        out?: string;
        outDir?: string;
        preserveConstEnums?: boolean;
        project?: string;
        removeComments?: boolean;
        sourceMap?: boolean;
        sourceRoot?: string;
        suppressImplicitAnyIndexErrors?: boolean;
        target?: ScriptTarget;
        version?: boolean;
        watch?: boolean;
        [option: string]: string | number | boolean;
    }
    const enum ModuleKind {
        None = 0,
        CommonJS = 1,
        AMD = 2,
    }
    interface LineAndCharacter {
        line: number;
        character: number;
    }
    const enum ScriptTarget {
        ES3 = 0,
        ES5 = 1,
        ES6 = 2,
        Latest = 2,
    }
    interface ParsedCommandLine {
        options: CompilerOptions;
        fileNames: string[];
        errors: Diagnostic[];
    }
    interface CommandLineOption {
        name: string;
        type: string | Map<number>;
        isFilePath?: boolean;
        shortName?: string;
        description?: DiagnosticMessage;
        paramType?: DiagnosticMessage;
        error?: DiagnosticMessage;
        experimental?: boolean;
    }
    const enum CharacterCodes {
        nullCharacter = 0,
        maxAsciiCharacter = 127,
        lineFeed = 10,
        carriageReturn = 13,
        lineSeparator = 8232,
        paragraphSeparator = 8233,
        nextLine = 133,
        space = 32,
        nonBreakingSpace = 160,
        enQuad = 8192,
        emQuad = 8193,
        enSpace = 8194,
        emSpace = 8195,
        threePerEmSpace = 8196,
        fourPerEmSpace = 8197,
        sixPerEmSpace = 8198,
        figureSpace = 8199,
        punctuationSpace = 8200,
        thinSpace = 8201,
        hairSpace = 8202,
        zeroWidthSpace = 8203,
        narrowNoBreakSpace = 8239,
        ideographicSpace = 12288,
        mathematicalSpace = 8287,
        ogham = 5760,
        _ = 95,
        $ = 36,
        _0 = 48,
        _1 = 49,
        _2 = 50,
        _3 = 51,
        _4 = 52,
        _5 = 53,
        _6 = 54,
        _7 = 55,
        _8 = 56,
        _9 = 57,
        a = 97,
        b = 98,
        c = 99,
        d = 100,
        e = 101,
        f = 102,
        g = 103,
        h = 104,
        i = 105,
        j = 106,
        k = 107,
        l = 108,
        m = 109,
        n = 110,
        o = 111,
        p = 112,
        q = 113,
        r = 114,
        s = 115,
        t = 116,
        u = 117,
        v = 118,
        w = 119,
        x = 120,
        y = 121,
        z = 122,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        ampersand = 38,
        asterisk = 42,
        at = 64,
        backslash = 92,
        backtick = 96,
        bar = 124,
        caret = 94,
        closeBrace = 125,
        closeBracket = 93,
        closeParen = 41,
        colon = 58,
        comma = 44,
        dot = 46,
        doubleQuote = 34,
        equals = 61,
        exclamation = 33,
        greaterThan = 62,
        hash = 35,
        lessThan = 60,
        minus = 45,
        openBrace = 123,
        openBracket = 91,
        openParen = 40,
        percent = 37,
        plus = 43,
        question = 63,
        semicolon = 59,
        singleQuote = 39,
        slash = 47,
        tilde = 126,
        backspace = 8,
        formFeed = 12,
        byteOrderMark = 65279,
        tab = 9,
        verticalTab = 11,
    }
    interface CancellationToken {
        isCancellationRequested(): boolean;
    }
    interface CompilerHost {
        getSourceFile(fileName: string, languageVersion: ScriptTarget, onError?: (message: string) => void): SourceFile;
        getDefaultLibFileName(options: CompilerOptions): string;
        getCancellationToken?(): CancellationToken;
        writeFile: WriteFileCallback;
        getCurrentDirectory(): string;
        getCanonicalFileName(fileName: string): string;
        useCaseSensitiveFileNames(): boolean;
        getNewLine(): string;
    }
    interface TextChangeRange {
        span: Span;
        newLength: number;
    }
}
declare module "typescript" {
    interface ErrorCallback {
        (message: DiagnosticMessage, length: number): void;
    }
    interface Scanner {
        getStartPos(): number;
        getToken(): SyntaxKind;
        getTextPos(): number;
        getTokenPos(): number;
        getTokenText(): string;
        getTokenValue(): string;
        hasExtendedUnicodeEscape(): boolean;
        hasPrecedingLineBreak(): boolean;
        isIdentifier(): boolean;
        isReservedWord(): boolean;
        isUnterminated(): boolean;
        reScanGreaterToken(): SyntaxKind;
        reScanSlashToken(): SyntaxKind;
        reScanTemplateToken(): SyntaxKind;
        scan(): SyntaxKind;
        setText(text: string): void;
        setTextPos(textPos: number): void;
        lookAhead<T>(callback: () => T): T;
        tryScan<T>(callback: () => T): T;
    }
    function tokenToString(t: SyntaxKind): string;
    function computeLineStarts(text: string): number[];
    function getPositionOfLineAndCharacter(sourceFile: SourceFile, line: number, character: number): number;
    function computePositionOfLineAndCharacter(lineStarts: number[], line: number, character: number): number;
    function getLineStarts(sourceFile: SourceFile): number[];
    function computeLineAndCharacterOfPosition(lineStarts: number[], position: number): {
        line: number;
        character: number;
    };
    function getLineAndCharacterOfPosition(sourceFile: SourceFile, position: number): LineAndCharacter;
    function isWhiteSpace(ch: number): boolean;
    function isLineBreak(ch: number): boolean;
    function isOctalDigit(ch: number): boolean;
    function skipTrivia(text: string, pos: number, stopAfterLineBreak?: boolean): number;
    function getLeadingCommentSpans(text: string, pos: number): CommentSpan[];
    function getTrailingCommentSpans(text: string, pos: number): CommentSpan[];
    function isIdentifierStart(ch: number, languageVersion: ScriptTarget): boolean;
    function isIdentifierPart(ch: number, languageVersion: ScriptTarget): boolean;
    function createScanner(languageVersion: ScriptTarget, skipTrivia: boolean, text?: string, onError?: ErrorCallback): Scanner;
}
declare module "typescript" {
    function getNodeConstructor(kind: SyntaxKind): new () => Node;
    function createNode(kind: SyntaxKind): Node;
    function forEachChild<T>(node: Node, cbNode: (node: Node) => T, cbNodeArray?: (nodes: Node[]) => T): T;
    function modifierToFlag(token: SyntaxKind): NodeFlags;
    function updateSourceFile(sourceFile: SourceFile, newText: string, textChangeRange: TextChangeRange, aggressiveChecks?: boolean): SourceFile;
    function isEvalOrArgumentsIdentifier(node: Node): boolean;
    function createSourceFile(fileName: string, sourceText: string, languageVersion: ScriptTarget, setParentNodes?: boolean): SourceFile;
    function isLeftHandSideExpression(expr: Expression): boolean;
    function isAssignmentOperator(token: SyntaxKind): boolean;
}
declare module "typescript" {
    function createTypeChecker(host: TypeCheckerHost, produceDiagnostics: boolean): TypeChecker;
}
declare module "typescript" {
    /** The version of the TypeScript compiler release */
    let version: string;
    function createCompilerHost(options: CompilerOptions, setParentNodes?: boolean): CompilerHost;
    function getPreEmitDiagnostics(program: Program): Diagnostic[];
    function flattenDiagnosticMessageText(messageText: string | DiagnosticMessageChain, newLine: string): string;
    function createProgram(rootNames: string[], options: CompilerOptions, host?: CompilerHost): Program;
}
declare module "typescript" {
    /** The version of the language service API */
    let servicesVersion: string;
    interface Node {
        getSourceFile(): SourceFile;
        getChildCount(sourceFile?: SourceFile): number;
        getChildAt(index: number, sourceFile?: SourceFile): Node;
        getChildren(sourceFile?: SourceFile): Node[];
        getStart(sourceFile?: SourceFile): number;
        getFullStart(): number;
        getEnd(): number;
        getWidth(sourceFile?: SourceFile): number;
        getFullWidth(): number;
        getLeadingTriviaWidth(sourceFile?: SourceFile): number;
        getFullText(sourceFile?: SourceFile): string;
        getText(sourceFile?: SourceFile): string;
        getFirstToken(sourceFile?: SourceFile): Node;
        getLastToken(sourceFile?: SourceFile): Node;
    }
    interface Symbol {
        getFlags(): SymbolFlags;
        getName(): string;
        getDeclarations(): Declaration[];
        getDocumentationComment(): SymbolDisplayPart[];
    }
    interface Type {
        getFlags(): TypeFlags;
        getSymbol(): Symbol;
        getProperties(): Symbol[];
        getProperty(propertyName: string): Symbol;
        getApparentProperties(): Symbol[];
        getCallSignatures(): Signature[];
        getConstructSignatures(): Signature[];
        getStringIndexType(): Type;
        getNumberIndexType(): Type;
    }
    interface Signature {
        getDeclaration(): SignatureDeclaration;
        getTypeParameters(): Type[];
        getParameters(): Symbol[];
        getReturnType(): Type;
        getDocumentationComment(): SymbolDisplayPart[];
    }
    interface SourceFile {
        getNamedDeclarations(): Declaration[];
        getLineAndCharacterOfPosition(pos: number): LineAndCharacter;
        getLineStarts(): number[];
        getPositionOfLineAndCharacter(line: number, character: number): number;
        update(newText: string, textChangeRange: TextChangeRange): SourceFile;
    }
    /**
     * Represents an immutable snapshot of a script at a specified time.Once acquired, the
     * snapshot is observably immutable. i.e. the same calls with the same parameters will return
     * the same values.
     */
    interface IScriptSnapshot {
        /** Gets a portion of the script snapshot specified by [start, end). */
        getText(start: number, end: number): string;
        /** Gets the length of this script snapshot. */
        getLength(): number;
        /**
         * Gets the TextChangeRange that describe how the text changed between this text and
         * an older version.  This information is used by the incremental parser to determine
         * what sections of the script need to be re-parsed.  'undefined' can be returned if the
         * change range cannot be determined.  However, in that case, incremental parsing will
         * not happen and the entire document will be re - parsed.
         */
        getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange;
    }
    module ScriptSnapshot {
        function fromString(text: string): IScriptSnapshot;
    }
    interface PreProcessedFileInfo {
        referencedFiles: FileReference[];
        importedFiles: FileReference[];
        isLibFile: boolean;
    }
    interface LanguageServiceHost {
        getCompilationSettings(): CompilerOptions;
        getNewLine?(): string;
        getScriptFileNames(): string[];
        getScriptVersion(fileName: string): string;
        getScriptSnapshot(fileName: string): IScriptSnapshot;
        getLocalizedDiagnosticMessages?(): any;
        getCancellationToken?(): CancellationToken;
        getCurrentDirectory(): string;
        getDefaultLibFileName(options: CompilerOptions): string;
        log?(s: string): void;
        trace?(s: string): void;
        error?(s: string): void;
    }
    interface LanguageService {
        cleanupSemanticCache(): void;
        getSyntacticDiagnostics(fileName: string): Diagnostic[];
        getSemanticDiagnostics(fileName: string): Diagnostic[];
        getCompilerOptionsDiagnostics(): Diagnostic[];
        getSyntacticClassifications(fileName: string, span: Span): ClassifiedSpan[];
        getSemanticClassifications(fileName: string, span: Span): ClassifiedSpan[];
        getCompletionsAtPosition(fileName: string, position: number): CompletionInfo;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails;
        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo;
        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): Span;
        getBreakpointStatementAtPosition(fileName: string, position: number): Span;
        getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems;
        getRenameInfo(fileName: string, position: number): RenameInfo;
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): RenameLocation[];
        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getNavigateToItems(searchValue: string, maxResultCount?: number): NavigateToItem[];
        getNavigationBarItems(fileName: string): NavigationBarItem[];
        getOutliningSpans(fileName: string): OutliningSpan[];
        getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[];
        getBraceMatchingAtPosition(fileName: string, position: number): Span[];
        getIndentationAtPosition(fileName: string, position: number, options: EditorOptions): number;
        getFormattingEditsForRange(fileName: string, start: number, end: number, options: FormatCodeOptions): TextChange[];
        getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions): TextChange[];
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): TextChange[];
        getEmitOutput(fileName: string): EmitOutput;
        getProgram(): Program;
        getSourceFile(fileName: string): SourceFile;
        dispose(): void;
    }
    interface ClassifiedSpan {
        textSpan: Span;
        classificationType: string;
    }
    interface NavigationBarItem {
        text: string;
        kind: string;
        kindModifiers: string;
        spans: Span[];
        childItems: NavigationBarItem[];
        indent: number;
        bolded: boolean;
        grayed: boolean;
    }
    interface TodoCommentDescriptor {
        text: string;
        priority: number;
    }
    interface TodoComment {
        descriptor: TodoCommentDescriptor;
        message: string;
        position: number;
    }
    class TextChange {
        span: Span;
        newText: string;
    }
    interface RenameLocation {
        textSpan: Span;
        fileName: string;
    }
    interface ReferenceEntry {
        textSpan: Span;
        fileName: string;
        isWriteAccess: boolean;
    }
    interface NavigateToItem {
        name: string;
        kind: string;
        kindModifiers: string;
        matchKind: string;
        isCaseSensitive: boolean;
        fileName: string;
        textSpan: Span;
        containerName: string;
        containerKind: string;
    }
    interface EditorOptions {
        IndentSize: number;
        TabSize: number;
        NewLineCharacter: string;
        ConvertTabsToSpaces: boolean;
    }
    interface FormatCodeOptions extends EditorOptions {
        InsertSpaceAfterCommaDelimiter: boolean;
        InsertSpaceAfterSemicolonInForStatements: boolean;
        InsertSpaceBeforeAndAfterBinaryOperators: boolean;
        InsertSpaceAfterKeywordsInControlFlowStatements: boolean;
        InsertSpaceAfterFunctionKeywordForAnonymousFunctions: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: boolean;
        PlaceOpenBraceOnNewLineForFunctions: boolean;
        PlaceOpenBraceOnNewLineForControlBlocks: boolean;
        [s: string]: boolean | number | string;
    }
    interface DefinitionInfo {
        fileName: string;
        textSpan: Span;
        kind: string;
        name: string;
        containerKind: string;
        containerName: string;
    }
    enum SymbolDisplayPartKind {
        aliasName = 0,
        className = 1,
        enumName = 2,
        fieldName = 3,
        interfaceName = 4,
        keyword = 5,
        lineBreak = 6,
        numericLiteral = 7,
        stringLiteral = 8,
        localName = 9,
        methodName = 10,
        moduleName = 11,
        operator = 12,
        parameterName = 13,
        propertyName = 14,
        punctuation = 15,
        space = 16,
        text = 17,
        typeParameterName = 18,
        enumMemberName = 19,
        functionName = 20,
        regularExpressionLiteral = 21,
    }
    interface SymbolDisplayPart {
        text: string;
        kind: string;
    }
    interface QuickInfo {
        kind: string;
        kindModifiers: string;
        textSpan: Span;
        displayParts: SymbolDisplayPart[];
        documentation: SymbolDisplayPart[];
    }
    interface RenameInfo {
        canRename: boolean;
        localizedErrorMessage: string;
        displayName: string;
        fullDisplayName: string;
        kind: string;
        kindModifiers: string;
        triggerSpan: Span;
    }
    interface SignatureHelpParameter {
        name: string;
        documentation: SymbolDisplayPart[];
        displayParts: SymbolDisplayPart[];
        isOptional: boolean;
    }
    /**
     * Represents a single signature to show in signature help.
     * The id is used for subsequent calls into the language service to ask questions about the
     * signature help item in the context of any documents that have been updated.  i.e. after
     * an edit has happened, while signature help is still active, the host can ask important
     * questions like 'what parameter is the user currently contained within?'.
     */
    interface SignatureHelpItem {
        isVariadic: boolean;
        prefixDisplayParts: SymbolDisplayPart[];
        suffixDisplayParts: SymbolDisplayPart[];
        separatorDisplayParts: SymbolDisplayPart[];
        parameters: SignatureHelpParameter[];
        documentation: SymbolDisplayPart[];
    }
    /**
     * Represents a set of signature help items, and the preferred item that should be selected.
     */
    interface SignatureHelpItems {
        items: SignatureHelpItem[];
        applicableSpan: Span;
        selectedItemIndex: number;
        argumentIndex: number;
        argumentCount: number;
    }
    interface CompletionInfo {
        isMemberCompletion: boolean;
        isNewIdentifierLocation: boolean;
        entries: CompletionEntry[];
    }
    interface CompletionEntry {
        name: string;
        kind: string;
        kindModifiers: string;
    }
    interface CompletionEntryDetails {
        name: string;
        kind: string;
        kindModifiers: string;
        displayParts: SymbolDisplayPart[];
        documentation: SymbolDisplayPart[];
    }
    interface OutliningSpan {
        /** The span of the document to actually collapse. */
        textSpan: Span;
        /** The span of the document to display when the user hovers over the collapsed span. */
        hintSpan: Span;
        /** The text to display in the editor for the collapsed region. */
        bannerText: string;
        /**
          * Whether or not this region should be automatically collapsed when
          * the 'Collapse to Definitions' command is invoked.
          */
        autoCollapse: boolean;
    }
    interface EmitOutput {
        outputFiles: OutputFile[];
        emitSkipped: boolean;
    }
    const enum OutputFileType {
        JavaScript = 0,
        SourceMap = 1,
        Declaration = 2,
    }
    interface OutputFile {
        name: string;
        writeByteOrderMark: boolean;
        text: string;
    }
    const enum EndOfLineState {
        Start = 0,
        InMultiLineCommentTrivia = 1,
        InSingleQuoteStringLiteral = 2,
        InDoubleQuoteStringLiteral = 3,
        InTemplateHeadOrNoSubstitutionTemplate = 4,
        InTemplateMiddleOrTail = 5,
        InTemplateSubstitutionPosition = 6,
    }
    enum TokenClass {
        Punctuation = 0,
        Keyword = 1,
        Operator = 2,
        Comment = 3,
        Whitespace = 4,
        Identifier = 5,
        NumberLiteral = 6,
        StringLiteral = 7,
        RegExpLiteral = 8,
    }
    interface ClassificationResult {
        finalLexState: EndOfLineState;
        entries: ClassificationInfo[];
    }
    interface ClassificationInfo {
        length: number;
        classification: TokenClass;
    }
    interface Classifier {
        /**
         * Gives lexical classifications of tokens on a line without any syntactic context.
         * For instance, a token consisting of the text 'string' can be either an identifier
         * named 'string' or the keyword 'string', however, because this classifier is not aware,
         * it relies on certain heuristics to give acceptable results. For classifications where
         * speed trumps accuracy, this function is preferable; however, for true accuracy, the
         * syntactic classifier is ideal. In fact, in certain editing scenarios, combining the
         * lexical, syntactic, and semantic classifiers may issue the best user experience.
         *
         * @param text                      The text of a line to classify.
         * @param lexState                  The state of the lexical classifier at the end of the previous line.
         * @param syntacticClassifierAbsent Whether the client is *not* using a syntactic classifier.
         *                                  If there is no syntactic classifier (syntacticClassifierAbsent=true),
         *                                  certain heuristics may be used in its place; however, if there is a
         *                                  syntactic classifier (syntacticClassifierAbsent=false), certain
         *                                  classifications which may be incorrectly categorized will be given
         *                                  back as Identifiers in order to allow the syntactic classifier to
         *                                  subsume the classification.
         */
        getClassificationsForLine(text: string, lexState: EndOfLineState, syntacticClassifierAbsent: boolean): ClassificationResult;
    }
    /**
      * The document registry represents a store of SourceFile objects that can be shared between
      * multiple LanguageService instances. A LanguageService instance holds on the SourceFile (AST)
      * of files in the context.
      * SourceFile objects account for most of the memory usage by the language service. Sharing
      * the same DocumentRegistry instance between different instances of LanguageService allow
      * for more efficient memory utilization since all projects will share at least the library
      * file (lib.d.ts).
      *
      * A more advanced use of the document registry is to serialize sourceFile objects to disk
      * and re-hydrate them when needed.
      *
      * To create a default DocumentRegistry, use createDocumentRegistry to create one, and pass it
      * to all subsequent createLanguageService calls.
      */
    interface DocumentRegistry {
        /**
          * Request a stored SourceFile with a given fileName and compilationSettings.
          * The first call to acquire will call createLanguageServiceSourceFile to generate
          * the SourceFile if was not found in the registry.
          *
          * @param fileName The name of the file requested
          * @param compilationSettings Some compilation settings like target affects the
          * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
          * multiple copies of the same file for different compilation settings.
          * @parm scriptSnapshot Text of the file. Only used if the file was not found
          * in the registry and a new one was created.
          * @parm version Current version of the file. Only used if the file was not found
          * in the registry and a new one was created.
          */
        acquireDocument(fileName: string, compilationSettings: CompilerOptions, scriptSnapshot: IScriptSnapshot, version: string): SourceFile;
        /**
          * Request an updated version of an already existing SourceFile with a given fileName
          * and compilationSettings. The update will in-turn call updateLanguageServiceSourceFile
          * to get an updated SourceFile.
          *
          * @param fileName The name of the file requested
          * @param compilationSettings Some compilation settings like target affects the
          * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
          * multiple copies of the same file for different compilation settings.
          * @param scriptSnapshot Text of the file.
          * @param version Current version of the file.
          */
        updateDocument(fileName: string, compilationSettings: CompilerOptions, scriptSnapshot: IScriptSnapshot, version: string): SourceFile;
        /**
          * Informs the DocumentRegistry that a file is not needed any longer.
          *
          * Note: It is not allowed to call release on a SourceFile that was not acquired from
          * this registry originally.
          *
          * @param fileName The name of the file to be released
          * @param compilationSettings The compilation settings used to acquire the file
          */
        releaseDocument(fileName: string, compilationSettings: CompilerOptions): void;
    }
    class ScriptElementKind {
        static unknown: string;
        static keyword: string;
        static scriptElement: string;
        static moduleElement: string;
        static classElement: string;
        static interfaceElement: string;
        static typeElement: string;
        static enumElement: string;
        static variableElement: string;
        static localVariableElement: string;
        static functionElement: string;
        static localFunctionElement: string;
        static memberFunctionElement: string;
        static memberGetAccessorElement: string;
        static memberSetAccessorElement: string;
        static memberVariableElement: string;
        static constructorImplementationElement: string;
        static callSignatureElement: string;
        static indexSignatureElement: string;
        static constructSignatureElement: string;
        static parameterElement: string;
        static typeParameterElement: string;
        static primitiveType: string;
        static label: string;
        static alias: string;
        static constElement: string;
        static letElement: string;
    }
    class ScriptElementKindModifier {
        static none: string;
        static publicMemberModifier: string;
        static privateMemberModifier: string;
        static protectedMemberModifier: string;
        static exportedModifier: string;
        static ambientModifier: string;
        static staticModifier: string;
    }
    class ClassificationTypeNames {
        static comment: string;
        static identifier: string;
        static keyword: string;
        static numericLiteral: string;
        static operator: string;
        static stringLiteral: string;
        static whiteSpace: string;
        static text: string;
        static punctuation: string;
        static className: string;
        static enumName: string;
        static interfaceName: string;
        static moduleName: string;
        static typeParameterName: string;
        static typeAlias: string;
    }
    interface DisplayPartsSymbolWriter extends SymbolWriter {
        displayParts(): SymbolDisplayPart[];
    }
    function displayPartsToString(displayParts: SymbolDisplayPart[]): string;
    function getDefaultCompilerOptions(): CompilerOptions;
    class OperationCanceledException {
    }
    class CancellationTokenObject {
        private cancellationToken;
        static None: CancellationTokenObject;
        constructor(cancellationToken: CancellationToken);
        isCancellationRequested(): boolean;
        throwIfCancellationRequested(): void;
    }
    function createLanguageServiceSourceFile(fileName: string, scriptSnapshot: IScriptSnapshot, scriptTarget: ScriptTarget, version: string, setNodeParents: boolean): SourceFile;
    let disableIncrementalParsing: boolean;
    function updateLanguageServiceSourceFile(sourceFile: SourceFile, scriptSnapshot: IScriptSnapshot, version: string, textChangeRange: TextChangeRange, aggressiveChecks?: boolean): SourceFile;
    function createDocumentRegistry(): DocumentRegistry;
    function preProcessFile(sourceText: string, readImportFiles?: boolean): PreProcessedFileInfo;
    function createLanguageService(host: LanguageServiceHost, documentRegistry?: DocumentRegistry): LanguageService;
    function createClassifier(): Classifier;
    /**
      * Get the path of the default library file (lib.d.ts) as distributed with the typescript
      * node package.
      * The functionality is not supported if the ts module is consumed outside of a node module.
      */
    function getDefaultLibFilePath(options: CompilerOptions): string;
}


//// [APISample_transform.js]
/*
 * Note: This test is a public API sample. The sample sources can be found
         at: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-simple-transform-function
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */
var ts = require("typescript");
function transform(contents, compilerOptions) {
    if (compilerOptions === void 0) { compilerOptions = {}; }
    // Sources
    var files = {
        "file.ts": contents,
        "lib.d.ts": fs.readFileSync(ts.getDefaultLibFilePath(compilerOptions)).toString()
    };
    // Generated outputs
    var outputs = [];
    // Create a compilerHost object to allow the compiler to read and write files
    var compilerHost = {
        getSourceFile: function (fileName, target) {
            return files[fileName] !== undefined ? ts.createSourceFile(fileName, files[fileName], target) : undefined;
        },
        writeFile: function (name, text, writeByteOrderMark) {
            outputs.push({
                name: name,
                text: text,
                writeByteOrderMark: writeByteOrderMark
            });
        },
        getDefaultLibFileName: function () {
            return "lib.d.ts";
        },
        useCaseSensitiveFileNames: function () {
            return false;
        },
        getCanonicalFileName: function (fileName) {
            return fileName;
        },
        getCurrentDirectory: function () {
            return "";
        },
        getNewLine: function () {
            return "\n";
        }
    };
    // Create a program from inputs
    var program = ts.createProgram([
        "file.ts"
    ], compilerOptions, compilerHost);
    // Query for early errors
    var errors = ts.getPreEmitDiagnostics(program);
    var emitResult = program.emit();
    errors = errors.concat(emitResult.diagnostics);
    return {
        outputs: outputs,
        errors: errors.map(function (e) {
            return e.file.fileName + "(" + (e.file.getLineAndCharacterOfPosition(e.start).line + 1) + "): " + ts.flattenDiagnosticMessageText(e.messageText, os.EOL);
        })
    };
}
// Calling our transform function using a simple TypeScript variable declarations, 
// and loading the default library like:
var source = "var x: number  = 'string'";
var result = transform(source);
console.log(JSON.stringify(result));
