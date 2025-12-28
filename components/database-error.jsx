"use client";

import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DatabaseError({ message, onRetry }) {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-900">
          <AlertCircle className="h-5 w-5" />
          Database Connection Error
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-red-800">
          {message || "Unable to connect to the database. Please check your database configuration."}
        </p>
        <div className="bg-white p-4 rounded-lg border border-red-200">
          <p className="text-sm font-semibold text-gray-900 mb-2">Quick Fix:</p>
          <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
            <li>Check your <code className="bg-gray-100 px-1 rounded">.env.local</code> file exists</li>
            <li>Verify <code className="bg-gray-100 px-1 rounded">DATABASE_URL</code> is set correctly</li>
            <li>Ensure your Neon database is active (not paused)</li>
            <li>Restart your development server after updating environment variables</li>
          </ol>
        </div>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="w-full">
            Retry Connection
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

